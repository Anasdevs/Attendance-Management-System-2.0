from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static  # Import static from django.conf.urls.static

admin.site.site_header = "Attendance Management System for MSI"
admin.site.site_title = "AMS Admin Panel"
admin.site.index_title = "Attendance Management System - MSI"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include('ams.urls')),  # Update the include statement with the correct app name
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
