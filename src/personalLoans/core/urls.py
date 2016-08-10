from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^core/(?P<template_name>.*)$', views.render_partial),
]
