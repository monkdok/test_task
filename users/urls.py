from django.conf.urls.static import static
from django.urls import path, include
from .views import UserListView, UserCreateView, UserUpdateView
from django.conf import settings


urlpatterns = [
    path('', UserListView.as_view(), name='user_list_url'),
    path('create/', UserCreateView.as_view(), name='add_user_url'),
    path('update/', UserUpdateView.as_view(), name='update_user_url'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
