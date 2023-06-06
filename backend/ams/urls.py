from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
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
     path('api/add-faculty', views.add_faculty, name='add-faculty'),
     path('api/remove-faculty', views.remove_faculty, name='remove-faculty'),
     path('api/edit-faculty', views.edit_faculty, name='edit-faculty'),
]
