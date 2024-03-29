from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class FacultyManager(BaseUserManager):
    def create_user(self, faculty_id, faculty_name, faculty_email, password=None):
        faculty = self.model(
            faculty_id=faculty_id,
            faculty_name=faculty_name,
            faculty_email=faculty_email,
        )
        # Set the password
        faculty.set_password(password)
        faculty.save();
        return faculty

Post=(
        ('Assistant Professor','Assistant Professor'),
        ('Associate Professor','Associate Professor'),
)
Role=(
        ('Head Of Department(HOD)','Head Of Department(HOD)'),
        ('Class Coordinator','Class Coordinator'),
        ('Subject Teacher','Subject Teacher'),
)
Department=(
    ('BCA','BCA'),
    ('BBA','BBA'),
    ('B.Com','B.Com'),
    ('B.Ed','B.Ed'),
    ('MBA','MBA'),
    ('Law','Law'),
)
class Faculty(AbstractBaseUser):
    def get_assigned_classes(self):
        return Class.objects.filter(assigned_to=self)

    faculty_id = models.CharField(max_length=20, unique=True)
    faculty_name = models.CharField(max_length=100)
    faculty_email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=True, default= None)
    faculty_image = models.ImageField(upload_to='faculty_images/', blank=True, null=True)
    Designation=models.CharField(max_length=50,choices=Post,default=None,blank=True)
    department=models.CharField(max_length=50,default=None,blank=True,choices=Department)
    qualifications=models.CharField(max_length=200,default=None,blank=True)
    role=models.CharField(max_length=50,default=None,blank=True ,choices=Role)
    


    objects = FacultyManager()

    USERNAME_FIELD = 'faculty_email'
    REQUIRED_FIELDS = ['faculty_id', 'faculty_name']

    def __str__(self):
        return f"{self.faculty_name.upper()} - {self.Designation} - {self.department} "
    

Semester=(
        ('1','1'),
        ('2','2'),
        ('3','3'),
        ('4','4'),
        ('5','5'),
        ('6','6'),
        ('7','7'),
        ('8','8'),
)

Section=(
        ('A','A'),
        ('B','B'),
        ('C','C'),
        ('D','D'),
)

shift=(
        ('Morning Shift','Morning Shift'),
        ('Evening Shift','Evening Shift'),
)
class Class(models.Model):
    course_id = models.IntegerField(unique=True)
    course = models.CharField(max_length=25,choices=Department)
    semester = models.CharField(max_length=25,choices=Semester)
    section = models.CharField(max_length=10,choices=Section)
    shift = models.CharField(max_length=20,choices=shift)
    coordinator = models.OneToOneField(Faculty, on_delete=models.SET_NULL, blank=True, null=True)
    

    def __str__(self):
        return f"{self.course} - {self.semester} - {self.section} - {self.shift}"

class Subject(models.Model):
    subject_id=models.IntegerField(default=None,unique=True)
    subject_name=models.CharField(max_length=100)
    class_subject=models.ForeignKey(Class,on_delete=models.CASCADE,related_name='class_subject')
    assigned_to = models.ForeignKey(Faculty, on_delete=models.CASCADE,related_name='assigned_to')

    def __str__(self):
        return f"{self.subject_name} - {self.class_subject} - {self.assigned_to.faculty_name}"

class Bca_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='Bca_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']


class Bca_Attendance(models.Model):
    student = models.ForeignKey('Bca_student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)

    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"

class Bba_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='Bba_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']

class Bba_Attendance(models.Model):
    student = models.ForeignKey('Bba_Student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)

    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"

class B_Ed_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='B_Ed_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']

class B_Ed_Attendance(models.Model):
    student = models.ForeignKey('B_Ed_Student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)


    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"


class B_Com_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='B_Com_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']

class B_Com_Attendance(models.Model):
    student = models.ForeignKey('B_Com_Student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)


    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"


class Mba_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='Mba_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']

class Mba_Attendance(models.Model):
    student = models.ForeignKey('Mba_Student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)


    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"


class Law_Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20, unique=True)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='Law_students')

    def __str__(self):
        return self.name
    class Meta:
         ordering = ['enrolment_no']

class Law_Attendance(models.Model):
    student = models.ForeignKey('Law_Student', on_delete=models.CASCADE)
    subject_name=models.ForeignKey(Subject,on_delete=models.CASCADE,default=None,null=True)
    class_attendance = models.ForeignKey('Class', on_delete=models.CASCADE, default=1)
    date = models.DateField()
    status = models.CharField(
    max_length=10,
    choices=(
        (None, 'Not marked'), 
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    ),
    null=True,
    default=None
)

    def __str__(self):
            return f"{self.student.name} - {self.class_attendance} - {self.date.strftime('%d %m %Y')}"
