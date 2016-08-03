from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^association/list/$', views.association_list, name='association_list'),
    # url(r'^association/(?P<pk>[0-9]+)/$', views.association_detail, name="association_detail"),
]
