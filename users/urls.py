from django.urls import path
from .views import getProfileImageUrl

urlpatterns = [
    path('<int:pk>',getProfileImageUrl),

]