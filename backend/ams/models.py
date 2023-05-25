from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt





# @csrf_exempt
# def signup(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         # Check if the email or username is already taken
#         if User.objects.filter(email=email).exists():
#             return JsonResponse({'error': 'Email is already taken'}, status=400)
#         if User.objects.filter(username=username).exists():
#             return JsonResponse({'error': 'Username is already taken'}, status=400)

#         # Create a new user
#         user = User.objects.create_user(email=email, username=username, password=password)
#         login(request, user)

#         return JsonResponse({'message': 'Signup successful'})
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

# @csrf_exempt
# def user_login(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')

#         # Authenticate the user
#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             login(request, user)
#             return JsonResponse({'message': 'Login successful'})
#         else:
#             return JsonResponse({'error': 'Invalid credentials'}, status=401)
#     else:
#         return JsonResponse({'error': 'Invalid request method'}, status=400)

# @login_required
# def user_logout(request):
#     logout(request)
#     return JsonResponse({'message': 'Logout successful'})
