from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.contrib.auth import get_user_model


class User(AbstractUser):
    groups = models.ManyToManyField(Group, related_name='user')

    # USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = []
    # objects = CustomUserManager()

    def __str__(self):
        return self.username


User = get_user_model()
