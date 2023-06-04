from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
import random

def home(request):
    data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(data)

# def send_mail(request):
#     from django.conf import settings
#     from django.core.mail import send_mail
#     if request.method == 'POST':
#         name = request.POST.get('name')
#         email = request.POST.get('email')
#         message = request.POST.get('message')
#         send_mail(
#             'Contact Form Submission',
#             'Name: {0} \n Email: {1} \n Message: {2}'.format(name, email, message),
#             'sudoharsh404@gmail.com',
#             [settings.EMAIL_HOST_USER],
#             fail_silently=False
#             )
#         return JsonResponse({'status': 'success'})
#     return JsonResponse({'status': 'error'})


import json
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse

def sendMail(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')
            to = data.get('to')
            
            if name and email and message and to:
                send_mail(
                    'Contact Form Submission',
                    'Name: {0} \nEmail: {1} \nMessage: {2}'.format(name, email, message),
                    settings.DEFAULT_FROM_EMAIL,
                    list(to)
                )
                return JsonResponse({'status': 'success'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Missing required fields'})
        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON payload'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})




def signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        # password = request.POST.get('password')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Username is already taken'}, status=400)
        # Check if the username is already taken
        otp = random.randrange(1000,9999)

        # Create a new user
        user = User.objects.create_user(username=username, password=password)
        login(request, user)

        return JsonResponse({'message': 'Signup successful'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Authenticate the user
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logout successful'})



from models import MSI

def Dashboard(request):
    # get teacher's profile
    
    # get class list


'''
onload fetch
    teacher profile
    total class
'''