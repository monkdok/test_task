from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.contrib.auth import get_user_model


class CustomGroup(Group):
    description = models.TextField(max_length=280, blank=True, null=True)


class User(AbstractUser):
    groups = models.ManyToManyField(CustomGroup, related_name='user', blank=True,)

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []
    # objects = CustomUserManager()

    def __str__(self):
        return self.username


User = get_user_model()