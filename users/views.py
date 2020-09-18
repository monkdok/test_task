from django.contrib.auth.forms import UserCreationForm
from django.http import JsonResponse
from django.template.loader import render_to_string

from .models import User
from .forms import *
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import CreateView, ListView, UpdateView


class UserListView(View):
    def get(self, request):
        form = CustomUserCreationForm()
        update_form = CustomUserChangeForm()
        users = User.objects.all()
        groups = CustomGroup.objects.all()
        context = {
            'groups': groups,
            'form': form,
            'update_form': update_form,
            'users': users,
        }
        return render(request, 'users/user-list.html', context)


class UserCreateView(View):
    def post(self, request):
        data = {}
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.save()
            form.save_m2m()
            users = User.objects.all()
            context = {
                'user': new_form,
                'user_num': users.count(),
            }
            data['form_is_valid'] = True
            data['html'] = render_to_string('users/ajax_snippets/add-user-snippet.html', context, request)
        else:
            data['form_is_valid'] = False
        return JsonResponse(data)


class UserUpdateView(View):
    def post(self, request):
        data = {}
        user = User.objects.get(username=request.POST['old_username'])
        form = CustomUserChangeForm(request.POST or None, instance=user)
        users = User.objects.all()
        groups = CustomGroup.objects.all()
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.save()
            form.save_m2m()
            context = {
                'num': request.POST['num'],
                'user': new_form,
                'user_num': users.count(),
                'groups': groups,
            }
            data['form_is_valid'] = True
            data['html'] = render_to_string('users/ajax_snippets/edit-user-snippet.html', context, request)
        else:
            data['form_is_valid'] = False
        return JsonResponse(data)


class UserDeleteView(View):
    def post(self, request):
        data = {}
        user = User.objects.get(username=request.POST['username'])
        user.delete()
        data['deleted'] = True
        form = CustomUserCreationForm()
        update_form = CustomUserChangeForm()
        users = User.objects.all()
        groups = Group.objects.all()
        context = {
            'groups': groups,
            'form': form,
            'update_form': update_form,
            'users': users,
        }
        data['deleted'] = True
        data['html'] = render_to_string('users/ajax_snippets/delete-user-snippet.html', context, request)
        return JsonResponse(data)


class GroupListView(View):
    def get(self, request):
        form = UserGroupForm()
        groups = CustomGroup.objects.all()
        context = {
            'form': form,
            'groups': groups
        }
        return render(request, 'groups/group-list.html', context)


class GroupCreateView(View):
    def post(self, request):
        data = {}
        form = UserGroupForm(request.POST)
        if form.is_valid():
            instance = form.save()
            context = {
                'group': instance,
            }
            data['form_is_valid'] = True
            data['html'] = render_to_string('groups/ajax_snippets/add-group-snippet.html', context, request)
        else:
            data['form_is_valid'] = False
        return JsonResponse(data)


class GroupUpdateView(View):
    pass


class GroupDeleteView(View):
    pass
