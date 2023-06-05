"""amsproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
#Changed urls.py
from django.contrib import admin
from django.urls import path, include
import ams.urls
from django.views.decorators.csrf import csrf_exempt
# from ams.views import csrf_token_view

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include(ams.urls)),
    # path('api/csrf_token', csrf_exempt(csrf_token_view), name='csrf_token'),
]
