from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [ 
     path('api/send-password/', views.send_password, name='send_password'),
     path('api/validate-password/', views.validate_password, name="validate_password"),
     path('api/signin/', views.signin, name='signin'),
     path('api/reset-password/', views.reset_password, name='reset_password'),
     path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
     path('api/take-attendance/', views.take_attendance, name='take_attendance'),
     path('api/submit-attendance/', views.submit_attendance, name='submit_attendance'),
     path('api/attendance/reports/', views.generate_attendance_report, name='generate_attendance_report'),



]