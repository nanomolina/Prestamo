from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<template_name>.*)$', views.render_partial),
    url(r'^associations/$', views.AssociationList.as_view()),
    url(r'^associations/(?P<pk>[0-9]+)/$', views.AssociationDetail.as_view()),
]
