from django.contrib.auth.forms import UserCreationForm
from .models import User
from .forms import *
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import CreateView, ListView


class UserListView(View):
    def get(self, request):
        form = CustomUserCreationForm()
        users = User.objects.all()
        groups = Group.objects.all()
        context = {
            'groups': groups,
            'form': form,
            'users': users,
        }
        return render(request, 'users/user-list.html', context)

    def post(self, request):
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.save()
            form.save_m2m()
        return redirect('user_list_url')
