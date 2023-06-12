from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.test, name="test"),
    path('adminlogin', views.adminlogin, name='adminlogin'),
    path('teacher/signup', views.teacher_register, name='register'),
    path('teacher/login/', views.teacher_login, name='login'),
    path('teacher/dashboard', views.teacher_dashboard, name='login'),
    path('class/create_class',views.create_class, name="create_class"),
    # path('send_attendence/', views.sendMail, name='send_mail'),
    # path('get_month_attendence/', views.sendMail, name='send_mail'),
    # path('get_attendence_report/', views.sendMail, name='send_mail'),
]