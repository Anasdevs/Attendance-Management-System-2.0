from django.urls import path
from django.shortcuts import redirect
from . import views
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [ 
     path('', views.admin_login_redirect, name='admin_login_redirect'),
     path('api/check-session/', views.check_session, name='check_session'),
     path('api/send-password/', views.send_password, name='send_password'),
     path('api/validate-password/', views.validate_password, name="validate_password"),
     path('api/signin/', views.signin, name='signin'),
     path('api/reset-password/', views.reset_password, name='reset_password'),
     path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
     path('api/classes-by-department/', views.get_classes_by_department, name='get_classes_by_dept'),
     path('api/take-attendance/', views.take_attendance, name='take_attendance'),
     path('api/submit-attendance/', views.submit_attendance, name='submit_attendance'),
     path('api/attendance/reports/', views.generate_attendance_report, name='generate_attendance_report'),
     path('api/attendance/reports-hod/', views.generate_attendance_report_hod, name='generate_attendance_report_hod'),
     path('api/faculty-profile/', views.faculty_profile, name='faculty_profile'),
     path('api/logout/', views.handle_logout, name="logout"),
     path('api/dashboard-data-CC/', views.dashboard_data_CC, name='dashboard_data_CC'),
]