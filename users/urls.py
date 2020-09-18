from django.conf.urls.static import static
from django.urls import path, include
from .views import UserListView, UserCreateView, UserUpdateView, UserDeleteView, GroupListView, GroupCreateView, GroupUpdateView, GroupDeleteView
from django.conf import settings


urlpatterns = [
    path('', UserListView.as_view(), name='user_list_url'),
    path('create/', UserCreateView.as_view(), name='add_user_url'),
    path('update/', UserUpdateView.as_view(), name='update_user_url'),
    path('delete/', UserDeleteView.as_view(), name='delete_user_url'),

    # Groups
    path('groups/', GroupListView.as_view(), name='group_list_url'),
    path('groups/create', GroupCreateView.as_view(), name='add_group_url'),
    path('groups/update', GroupUpdateView.as_view(), name='update_group_url'),
    path('groups/delete', GroupDeleteView.as_view(), name='delete_group_url'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
