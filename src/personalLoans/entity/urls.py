from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^associations/$', views.AssociationList.as_view()),
    url(r'^associations/(?P<pk>[0-9]+)/$', views.AssociationDetail.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investors/$', views.InvestorList.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investor/(?P<pk>[0-9]+)/$', views.InvestorDetail.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investment/(?P<pk>[0-9]+)/$', views.InvestmentDetail.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investments/$', views.InvestmentList.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investments/export/$', views.investment_export),
    url(r'^associations/(?P<assoc_id>[0-9]+)/investments/total/$', views.TotalInvestments.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/revenue/$', views.RevenueList.as_view()),
    url(r'^associations/(?P<assoc_id>[0-9]+)/revenue/export/$', views.revenue_export),
    url(r'^associations/(?P<assoc_id>[0-9]+)/revenue/total/$', views.TotalRevenues.as_view()),
    url(r'^avatars/$', views.get_avatars),
    url(r'^(?P<template_name>.*)$', views.render_partial),
]

urlpatterns = format_suffix_patterns(urlpatterns)
