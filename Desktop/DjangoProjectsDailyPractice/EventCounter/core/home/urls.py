from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.countdown_timer, name="countdown_timer")
]