from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^associations/$', views.AssociationList.as_view()),
    url(r'^associations/(?P<pk>[0-9]+)/$', views.AssociationDetail.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investors/$', views.InvestorList.as_view()),
    url(r'^(?P<template_name>.*)$', views.render_partial),
]

urlpatterns = format_suffix_patterns(urlpatterns)
