from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import Group

from .models import User, CustomGroup


class CustomUserCreationForm(UserCreationForm):
    # def __init__(self, *args, **kw):
    #     super().__init__(*args, **kw)
    #     self.fields['groups'].queryset = Group.objects.all()
    # groups = forms.ModelChoiceField(queryset=Group.objects.all())

    class Meta:
        model = User
        fields = ('username', 'groups')


# class CustomUserChangeForm(UserChangeForm):
class CustomUserChangeForm(forms.ModelForm):
    # groups = forms.ModelChoiceField(queryset=CustomGroup.objects.all(), required=False)

    class Meta:
        model = User
        fields = ('username', 'groups')
        widgets = {
            'manager': forms.Select(),
        }


class UserGroupForm(forms.ModelForm):
    class Meta:
        model = CustomGroup
        fields = '__all__'

        widgets = {
            'name': forms.Select(attrs={'style': 'width:250px'}),
            'description': forms.Textarea(attrs={'style': 'width:250px'})
        }
