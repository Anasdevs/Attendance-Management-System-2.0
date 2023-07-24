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

class Faculty(AbstractBaseUser):
    def get_assigned_classes(self):
        return Class.objects.filter(assigned_to=self)

    faculty_id = models.CharField(max_length=20, unique=True)
    faculty_name = models.CharField(max_length=100)
    faculty_email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, blank=True, default= None)
    faculty_image = models.ImageField(upload_to='faculty_images/', blank=True, null=True)

    objects = FacultyManager()

    USERNAME_FIELD = 'faculty_email'
    REQUIRED_FIELDS = ['faculty_id', 'faculty_name']

    def __str__(self):
        return self.faculty_name
    

class Class(models.Model):
    course_id = models.IntegerField()
    course = models.CharField(max_length=100)
    semester = models.IntegerField()
    section = models.CharField(max_length=10)
    shift = models.CharField(max_length=20)
    subject = models.CharField(max_length=100)
    assigned_to = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.course} - {self.semester} - {self.section}"


class Student(models.Model):
    name = models.CharField(max_length=100)
    enrolment_no = models.CharField(max_length=20)
    class_attendance = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='students')

    def __str__(self):
        return self.name


class Attendance(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE)
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

    class Meta:
            unique_together = ('student', 'date',)

