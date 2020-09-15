from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import Group

from .models import User


class CustomUserCreationForm(UserCreationForm):
    # def __init__(self, *args, **kw):
    #     super().__init__(*args, **kw)
    #     self.fields['groups'].queryset = Group.objects.all()
    # groups = forms.ModelChoiceField(queryset=Group.objects.all())

    class Meta:
        model = User
        fields = ('username', 'groups')




class CustomUserChangeForm(UserChangeForm):
    groups = forms.ModelChoiceField(queryset=Group.objects.all())

    class Meta:
        model = User
        fields = ('username', 'groups')