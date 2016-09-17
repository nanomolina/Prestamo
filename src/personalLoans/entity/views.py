#!/usr/bin/env python
# -*- coding: utf-8 -*-

from entity.models import Association, Investor
from entity.serializers import AssociationSerializer, InvestorSerializer
from django.template.response import TemplateResponse
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from django.http import JsonResponse


def render_partial(request, template_name):
    template = 'entity/%s' % (template_name)
    return TemplateResponse(
        request, template, {}
    )


class AssociationList(ListCreateAPIView):
    serializer_class = AssociationSerializer

    def get_queryset(self):
        return self.request.user.association_partner_set.all()

    def post(self, request, *args, **kwargs):
        request.data['founder'] = request.user.id
        response = self.create(request, *args, **kwargs)
        new_association = Association.objects.get(id=response.data['id'])
        new_association.partners.add(request.user)
        return response


class AssociationDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = AssociationSerializer

    def get_queryset(self):
        return self.request.user.association_partner_set.all()


class InvestorList(ListCreateAPIView):
    serializer_class = InvestorSerializer

    def get_queryset(self):
        assoc_id = self.kwargs['assoc_id']
        return Investor.objects.filter(association__id=assoc_id)

    def post(self, request, *args, **kwargs):
        assoc_id = self.kwargs['assoc_id']
        request.data['association'] = assoc_id
        response = self.create(request, *args, **kwargs)
        return response

def get_avatars(request):
    from entity.functions import filter_files
    from os.path import join
    from django.conf import settings

    url_men = join(settings.STATIC_ROOT, 'img/avatars/men/')
    url_women = join(settings.STATIC_ROOT, 'img/avatars/women/')
    men_avatars = filter_files(url_men, '.svg')
    women_avatars = filter_files(url_women, '.svg')
    return JsonResponse(
        {'men_avatars': men_avatars, 'women_avatars': women_avatars}
    )
