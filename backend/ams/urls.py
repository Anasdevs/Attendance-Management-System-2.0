from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index),
    # path('teacher/login/', views.user_login, name='login'),
    # path('teacher/logout/', views.user_logout, name='logout'),
    # path('signup/', views.user_login, name='login'),
    # path('admin/', views.user_login, name='login'), instead
    # path('admin/dashboard', views.user_login, name='login'),
    # path('teacher/dashboard', views.user_login, name='login'),
    # path('send_attendence/', views.sendMail, name='send_mail'),
    # path('get_month_attendence/', views.sendMail, name='send_mail'),
    # path('get_attendence_report/', views.sendMail, name='send_mail'),
     path('api/adminlogin', views.adminlogin, name='adminlogin'),
]
