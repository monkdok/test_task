from django.contrib import admin
from .models import User, CustomGroup

admin.site.register(User)
admin.site.register(CustomGroup)

