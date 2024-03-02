from django.contrib import admin
from .models import UserProfile, History

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(History)