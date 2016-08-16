from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<template_name>.*)$', views.render_partial),
    url(r'^investors/', views.investors_list, name='investors_list'),
    url(r'^association/list/$', views.association_list, name='association_list'),
    # url(r'^association/(?P<pk>[0-9]+)/$', views.association_detail, name="association_detail"),
]
