from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse

def home(request):
    data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(data)

def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Check if the username is already taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username is already taken'}, status=400)

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


