from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.test, name="test"),
    path('adminlogin', views.adminlogin, name='adminlogin'),
    # path('admin/teacher_signup/', csrf_exempt(views.teacher_register.as_view()), name='register'),
    path('admin/teacher_signup/', views.teacher_register, name='register'),
    path('teacher/login/', views.teacher_login, name='login'),
    path('teacher/dashboard', views.teacher_dashboard, name='login'),
    path('class/create_class',views.create_class, name="create_class"),
    # path('send_attendence/', views.sendMail, name='send_mail'),
    # path('get_month_attendence/', views.sendMail, name='send_mail'),
    # path('get_attendence_report/', views.sendMail, name='send_mail'),
<<<<<<< HEAD
     path('api/adminlogin', views.adminlogin, name='adminlogin'),
     path('api/add-faculty', views.add_faculty, name='add-faculty'),
     path('api/remove-faculty', views.remove_faculty, name='remove-faculty'),
     path('api/edit-faculty', views.edit_faculty, name='edit-faculty'),
=======
>>>>>>> f68243061b513434017bb686e5993cd096045fb6
]
# urlpatterns = [
#     path('', views.test, name="test"),
#     url('adminlogin', views.adminlogin, name='adminlogin'),
#     path('admin/teacher_signup/', csrf_exempt(views.teacher_register.as_view()), name='register'),
#     path('teacher/login/', views.teacher_login, name='login'),
#     path('teacher/dashboard', views.teacher_dashboard, name='login'),
#     path('class/create_class',views.create_class, name="create_class"),
#     # path('send_attendence/', views.sendMail, name='send_mail'),
#     # path('get_month_attendence/', views.sendMail, name='send_mail'),
#     # path('get_attendence_report/', views.sendMail, name='send_mail'),
# ]
