from django.shortcuts import redirect, get_object_or_404
import string
import random
import json
from django.core.mail import send_mail
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from .models import Faculty, Class, Subject, Bca_Student, Bca_Attendance, Bba_Student, Bba_Attendance, B_Com_Student, B_Com_Attendance,B_Ed_Student,B_Ed_Attendance,Mba_Student,Mba_Attendance,Law_Student,Law_Attendance
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_POST
from datetime import datetime
from django.db.models import Q, Value, Subquery, OuterRef
from django.db.models.functions import Coalesce
import csv
from django.http import HttpResponse
from django.urls import reverse
import os
import dotenv
from datetime import timedelta
from django.utils import timezone
from django.conf import settings


dotenv.load_dotenv()

@csrf_exempt
def admin_login_redirect(request):
    return redirect(reverse('admin:index'))

@csrf_exempt
def send_password(request):
    if request.method == 'POST':
        # Retrieve JSON data from the request body
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')

        try:
            # Check if faculty email exists in the Faculty model
            faculty = Faculty.objects.get(faculty_email=email)
            if faculty.password:
                return JsonResponse({'message': 'Faculty already exists. Please sign in.'})
        except ObjectDoesNotExist:
            # Return a response indicating that the faculty email is not found
            return JsonResponse({'message': 'Your email is not added. Please contact the administrator.'})

        # Generate a random password
        password = generate_random_password()

        # Send password email
        send_password_email(email, password)

        # Update faculty model with hashed password
        faculty.password = make_password(password)
        faculty.save()

        response_msg = f"Password sent to {email}"
        return JsonResponse({'message': response_msg})

    return JsonResponse({'error': 'Invalid request'})


def generate_random_password(length=8):
    # Generate a random password of the specified length
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))


def send_password_email(email, password):
    # Compose email message
    subject = 'Your Account Password for AMS'
    message = f'Your account password is: {password}'
    from_email = os.environ.get('EMAIL_HOST_USER')
    recipient_list = [email]
    # Send email
    send_mail(subject, message, from_email, recipient_list)


@csrf_exempt
def validate_password(request):
    if request.method == 'POST':
        # Retrieve JSON data from the request body
        data = json.loads(request.body)
        email = data.get('email')
        password_entered = data.get('password')

        try:
            # Retrieve the faculty with the provided email
            faculty = Faculty.objects.get(faculty_email=email)

            # Check if the provided password matches the hashed password in the model
            if check_password(password_entered, faculty.password):
                return JsonResponse({'success': True, 'message': 'Password validated successfully!'})

            else:
                return JsonResponse({'success': False, 'message': 'Invalid password'})

        except Faculty.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Faculty not found'})

    return JsonResponse({'success': False, 'message': 'Invalid request'})

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.hashers import check_password
from datetime import timedelta
from django.utils import timezone

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password_entered = data.get('password')
        remember_me = data.get('rememberMe', False)  # Default to False if not provided in the request data

        try:
            faculty = Faculty.objects.get(faculty_email=email)

            if check_password(password_entered, faculty.password):
                # Create a session for the authenticated user
                request.session['faculty_email'] = faculty.faculty_email

                if remember_me:
                    # If "Remember Me" is checked, set a longer session age
                    request.session.set_expiry(settings.REMEMBER_ME_SESSION_AGE)
                else:
                    # If "Remember Me" is not checked, use the default session age
                    request.session.set_expiry(settings.SESSION_COOKIE_AGE)

                request.session.save()

                return JsonResponse({'success': True, 'message': 'Password validated successfully!'})
            else:
                return JsonResponse({'success': False, 'message': 'Invalid email or password.'})

        except Faculty.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Invalid email or password.'})

    else:
        return JsonResponse({'success': False, 'message': 'Invalid request'})



#To check if user is authenticated (for react)
@csrf_exempt
def check_session(request):
    faculty_email = request.session.get('faculty_email')
    is_authenticated = bool(faculty_email)

    if is_authenticated:
        return JsonResponse({'is_authenticated': True})
    else:
        return JsonResponse({'is_authenticated': False}, status=401)


@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get('email')
        
        try:
            faculty = Faculty.objects.get(faculty_email=email)
            
            # Send password email
            password = generate_random_password()
            send_password_email(email, password)
            
            # Update faculty model with hashed password
            faculty.password = make_password(password)
            faculty.save()
            
            response_msg = f"Password sent to {email}"
            return JsonResponse({'success': True, 'message': "Password reset success"})
        
        except Faculty.DoesNotExist:
            return JsonResponse({'message': 'Faculty does not exist. Please contact the administrator.'})
    
    return JsonResponse({'success': 'False', 'message': 'Invalid request'})


@csrf_exempt
def dashboard_data(request):
    try:
        faculty_email = request.session.get('faculty_email')

        if faculty_email:
            faculty = Faculty.objects.get(faculty_email=faculty_email)

            # Get the faculty image URL
            faculty_image_url = faculty.faculty_image.url if faculty.faculty_image else None

            # Build the absolute URL for the faculty image
            if faculty_image_url:
                faculty_image_url = request.build_absolute_uri(faculty_image_url)

            faculty_data = {
                'name': faculty.faculty_name,
                'email': faculty.faculty_email,
                'image_url': faculty_image_url,
                'role': faculty.role,
                'department': faculty.department
            }

            assigned_subjects = Subject.objects.filter(assigned_to=faculty)
            subjects_list = []


            for assigned_subject in assigned_subjects:
                class_data = assigned_subject.class_subject
                class_info = {
                    'course_id': class_data.course_id,
                    'course': class_data.course,
                    'semester': class_data.semester,
                    'section': class_data.section,
                    'subject': assigned_subject.subject_name,
                    }
                subjects_list.append(class_info)

            response_data = {
                'faculty': faculty_data,
                'classes': subjects_list 
        }

            return JsonResponse(response_data, safe=False)
        else:
            return JsonResponse({'error': 'User is not authenticated'}, status=302)

    except Faculty.DoesNotExist:
        return JsonResponse({'error': 'Faculty not found'}, status=404)




@csrf_exempt
def take_attendance(request):
    if request.method == 'GET':
        course_id = request.GET.get('course_id')
        date = request.GET.get('date')

        email = request.session.get('faculty_email')
        if not is_course_assigned_to_faculty(email, course_id):
            return JsonResponse({'error': 'Unauthorized access to the course.'}, status=403)

        try:
            class_obj = Class.objects.get(course_id=course_id)
            class_name = f"{class_obj.course}-{class_obj.semester}-{class_obj.section} {class_obj.subject}"

            course_student_models = {
                'BCA': (Bca_Student, Bca_Attendance),
                'BBA': (Bba_Student, Bba_Attendance),
                'BED': (B_Ed_Student, B_Ed_Attendance),
                'law': (Law_Student, Law_Attendance),
                'mba': (Mba_Student, Mba_Attendance),
                'bcom': (B_Com_Student, B_Com_Attendance),
            }

            if class_obj.course in course_student_models:
                student_model, attendance_model = course_student_models[class_obj.course]
            else:
                return JsonResponse({'error': 'Invalid course ID.'}, status=400)

            attendance_subquery = attendance_model.objects.filter(
                student_id=OuterRef('pk'),
                date=date
            ).values('status', 'date')

            student_data = student_model.objects.filter(class_attendance__course_id=course_id).values(
                'enrolment_no',
                'name',
            ).annotate(
                filtered_status=Coalesce(Subquery(attendance_subquery.values('status')), Value(None)),
                filtered_date=Coalesce(Subquery(attendance_subquery.values('date')), Value(None)),
            ).distinct()
            students = []
            for data in student_data:
                student = {
                    'enrolment_no': data['enrolment_no'],
                    'name': data['name'],
                    'attendance__status': data['filtered_status'],
                    'attendance__date': data['filtered_date'],
                }
                students.append(student)
        except Class.DoesNotExist:
            class_name = "Class Name Not Found"
            students = []

        response_data = {
            'class_name': class_name,
            'students': students,
        }
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=302)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)

def is_course_assigned_to_faculty(email, course_id):
    try:
        faculty = Faculty.objects.get(faculty_email=email)
        assigned_courses = Class.objects.filter(assigned_to=faculty)
        return assigned_courses.filter(course_id=course_id).exists()
    except Faculty.DoesNotExist:
        return False


@require_POST
@csrf_exempt
def submit_attendance(request):
    try:
        data = json.loads(request.body)
        course_id = data.get('course_id')
        attendance_data = data.get('attendance_data')

        # Retrieve the class object by course ID
        class_obj = Class.objects.get(course_id=course_id)
        # Mapping of course_id to student_model and attendance_model
        course_student_models = {
            'BCA': (Bca_Student, Bca_Attendance),
            'BBA': (Bba_Student, Bba_Attendance),
            'BED': (B_Ed_Student, B_Ed_Attendance),
            'law': (Law_Student, Law_Attendance),
            'mba': (Mba_Student, Mba_Attendance),
            'bcom': (B_Com_Student, B_Com_Attendance),
        }

        # Check if course_id exists in the mapping
        if class_obj.course not in course_student_models:
            return JsonResponse({'error': 'Invalid course ID.'}, status=400)

        student_model, attendance_model = course_student_models[class_obj.course]
        for fields in attendance_data:
            enrolment_no = fields.get('enrolment_no')
            attendance_status = fields.get('attendance__status')
            attendance_date_str = fields.get('attendance_date')
            if(attendance_date_str == None):
                continue

            # Convert the date string to a datetime object
            attendance_date = datetime.fromisoformat(attendance_date_str)

            # Retrieve the student by enrolment_no
            student_obj = student_model.objects.get(enrolment_no=enrolment_no, class_attendance=class_obj)

            # Retrieve the existing attendance record for the student and date
            attendance = attendance_model.objects.filter(student=student_obj, class_attendance=class_obj, date=attendance_date).first()

            # If the attendance record exists, update the attendance status
            if attendance:
                attendance.status = attendance_status
                attendance.save()
            else:
                # Create a new attendance record
                attendance = attendance_model.objects.create(student=student_obj, class_attendance=class_obj, date=attendance_date, status=attendance_status)

        return JsonResponse({'message': 'Attendance submitted successfully'})
    except Exception as e:
        return JsonResponse({'error': str(e)})
    

from django.db.models import Count, F
@csrf_exempt
def generate_attendance_report(request):
    if request.method == 'GET':
        start_date = request.GET.get('startDate')
        end_date = request.GET.get('endDate')
        course_id = request.GET.get('courseId') 
        if not all([start_date, end_date, course_id]):
            return JsonResponse({'error': 'Please provide valid start date, end date, and course ID.'}, status=400)

        try:
            # Retrieve the class object by course ID
            class_obj = Class.objects.get(course_id=course_id)

            # Get the course name from the class object
            course_name = class_obj.course

        except Class.DoesNotExist:
            return JsonResponse({'error': 'Invalid course ID.'}, status=400)

        # Mapping of course name to attendance_model
        course_attendance_models = {
            'BCA': Bca_Attendance,
            'BBA': Bba_Attendance,
            'BED': B_Ed_Attendance,
            'law': Law_Attendance,
            'mba': Mba_Attendance,
            'bcom': B_Com_Attendance,
        }

        # Check if course name exists in the mapping
        if course_name not in course_attendance_models:
            return JsonResponse({'error': 'Invalid course name.'}, status=400)

        attendance_model = course_attendance_models[course_name]

        attendance_data = attendance_model.objects.filter(
            date__range=[start_date, end_date],
            class_attendance__course_id=course_id
        )

        if not attendance_data.exists():
            return JsonResponse({'error': 'No attendance data found for the given date range and course ID.'}, status=404)

        # Prepare the CSV response
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="attendance_report_{start_date}_{end_date}.csv"'

        # Create the CSV writer
        writer = csv.writer(response)
        writer.writerow(['Enrollment Number', 'Name', 'Subject', 'Present Days', 'Total Days', 'Percentage'])

        # Calculate attendance statistics for each student
        attendance_stats = attendance_data.values(
            'student__enrolment_no',
            'student__name',
            'class_attendance__subject',
        ).annotate(
            total_present=Count('id', filter=Q(status='Present')),
            total_days=Count('id')
        ).order_by('student__enrolment_no')

        # Write attendance data to the CSV file
        for stats in attendance_stats:
            enrollment_no = stats['student__enrolment_no']
            print(enrollment_no)
            name = stats['student__name']
            subject = stats['class_attendance__subject']
            present_days = stats['total_present']
            total_days = stats['total_days']
            percentage = (present_days / total_days) * 100 if total_days > 0 else 0

            writer.writerow([enrollment_no, name, subject, present_days, total_days, percentage])

        return response

    return JsonResponse({'error': 'Invalid request'})


@csrf_exempt
def faculty_profile(request):
    try:
        faculty_email = request.session.get('faculty_email')
        if faculty_email:
            faculty_data = Faculty.objects.get(faculty_email=faculty_email)
            faculty_image_url = faculty_data.faculty_image.url if faculty_data.faculty_image else None
            if faculty_image_url:
                faculty_image_url = request.build_absolute_uri(faculty_image_url)
            faculty_profile_data = {
                'name': faculty_data.faculty_name,
                'designation': faculty_data.Designation,
                'image': faculty_image_url,  # Fixed the curly braces here
                'department': faculty_data.department,
                'qualification': faculty_data.qualifications,
                'email': faculty_data.faculty_email,
                # 'role': faculty_data.role,
            }
            return JsonResponse(faculty_profile_data)

    except Faculty.DoesNotExist:
        pass

    return JsonResponse({'error': 'Faculty not found'}, status=404)

@csrf_exempt
def handle_logout(request):
    if request.method == 'POST':
        # Delete the session data
        request.session.flush()
        return JsonResponse({'message': 'Logout successful'})
    return JsonResponse({'error': 'Invalid request'})


def get_classes_by_department(request):
    if request.method == 'GET':
        department = request.GET.get('department')
        print(department)

        if not department:
            return JsonResponse({'error': 'Please provide a valid department.'}, status=400)

        # Get all instances of the Class model that match the provided department
        class_instances = Class.objects.filter(course=department)

        class_list = []
        for instance in class_instances:
            class_list.append({
                'course_id': instance.course_id,
                'course' : instance.course,
                'semester': instance.semester,
                'section': instance.section,
                'shift': instance.shift,
                'subject': instance.subject,
                'assigned_to': instance.assigned_to.faculty_name if instance.assigned_to else None,
                'coordinator': instance.coordinator.faculty_name if instance.coordinator else None,
            })

        return JsonResponse({'classes': class_list})

    return JsonResponse({'error': 'Invalid request'})


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse  
import csv
from django.db.models import Count, Q

from .models import Bca_Attendance, Bba_Attendance, B_Ed_Attendance, Law_Attendance, Mba_Attendance, B_Com_Attendance, Class

@csrf_exempt
def generate_attendance_report_hod(request):
    if request.method == 'GET':
        start_date = request.GET.get('startDate')
        end_date = request.GET.get('endDate')
        course_id = request.GET.get('courseId')
        class_name = request.GET.get('className')  # New parameter for class name
        
        if not all([start_date, end_date]):
            return JsonResponse({'error': 'Please provide valid start date and end date.'}, status=400)
        
        # Determine if all subjects or a specific subject is selected
        if class_name:
            try:
                # Get the course name from the class name
                course_name = class_name.split(' - ')[0]

                # Mapping of course name to attendance_model
                course_attendance_models = {
                    'BCA': Bca_Attendance,
                    'BBA': Bba_Attendance,
                    'BED': B_Ed_Attendance,
                    'law': Law_Attendance,
                    'mba': Mba_Attendance,
                    'bcom': B_Com_Attendance,
                }

                # Check if course name exists in the mapping
                if course_name not in course_attendance_models:
                    return JsonResponse({'error': 'Invalid course name.'}, status=400)

                attendance_model = course_attendance_models[course_name]
                attendance_data = attendance_model.objects.filter(
                    date__range=[start_date, end_date],
                    class_attendance__course_id=course_id,
                )

                if not attendance_data.exists():
                    return JsonResponse({'error': 'No attendance data found for the given parameters.'}, status=404)

                # Prepare the CSV response
                response = HttpResponse(content_type='text/csv')
                response['Content-Disposition'] = f'attachment; filename="attendance_report_{start_date}_{end_date}.csv"'

                # Create the CSV writer
                writer = csv.writer(response)
                writer.writerow(['Enrollment Number', 'Name'] + [f'Subject {i}' for i in range(1, 6)] + ['Total Days', 'Percentage'])  # Assuming max 5 subjects

                # Calculate attendance statistics for each student
                attendance_stats = attendance_data.values(
                    'student__enrolment_no',
                    'student__name',
                    'class_attendance__subject',
                ).annotate(
                    total_present=Count('id', filter=Q(status='Present')),
                    total_days=Count('id')
                ).order_by('student__enrolment_no')

                # Write attendance data to the CSV file
                for stats in attendance_stats:
                    enrollment_no = stats['student__enrolment_no']
                    name = stats['student__name']
                    present_days = stats['total_present']
                    total_days = stats['total_days']
                    percentage = (present_days / total_days) * 100 if total_days > 0 else 0

                    # Generate a list to store subject-wise attendance data
                    subject_attendance = []

                    # Fetch attendance data for each subject and add to the list
                    for subj_num in range(1, 6):  # Assuming max 5 subjects
                        subj_attendance = attendance_model.objects.filter(
                            date__range=[start_date, end_date],
                            class_attendance__course_id=course_id,
                            class_attendance__subject=f'Subject {subj_num}',
                            student__enrolment_no=enrollment_no,
                        ).aggregate(total_present=Count('id', filter=Q(status='Present')))
                        subject_attendance.append(subj_attendance['total_present'])

                    # Add total days and percentage to the list
                    subject_attendance += [total_days, percentage]

                    writer.writerow([enrollment_no, name] + subject_attendance)

                return response

            except Class.DoesNotExist:
                return JsonResponse({'error': 'Invalid course details.'}, status=400)
        
        # If class name is not provided, handle the case for generating report for all subjects
        else:
            return JsonResponse({'error': 'Invalid request'})





