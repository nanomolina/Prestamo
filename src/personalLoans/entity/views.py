#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.http import JsonResponse
from django.template.response import TemplateResponse
from rest_framework.decorators import api_view
from rest_framework import filters
from rest_framework.generics import (ListCreateAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.pagination import PageNumberPagination

from entity.models import Association, Investment, Investor
from entity.serializers import (AssociationSerializer, InvestmentSerializer,
                                InvestorSerializer)


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


class SetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'


class InvestmentFilter(filters.FilterSet):
    import django_filters
    year = django_filters.NumberFilter(name="date__year", lookup_type='contains')
    month = django_filters.NumberFilter(name="date__month", lookup_type='contains')
    class Meta:
        model = Investment
        fields = ['investor', 'fee', 'year', 'month']


class InvestmentList(ListCreateAPIView):
    serializer_class = InvestmentSerializer
    pagination_class = SetPagination
    filter_backends = (filters.OrderingFilter, filters.SearchFilter,
        filters.DjangoFilterBackend)
    filter_class = InvestmentFilter
    ordering_fields = (
        'date', 'investor', 'warrant', 'authorization', 'first_name',
        'last_name', 'capital', 'final_capital', 'fee', 'interests'
    )
    search_fields = ('first_name', 'last_name')

    def get_queryset(self):
        assoc_id = self.kwargs['assoc_id']
        return Investment.objects.filter(investor__association__id=assoc_id)


def investment_excel(request, assoc_id):
    if request.method == 'GET':
        from datetime import datetime, date
        import calendar
        from core.constant import MONTHS
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        weekday, total_days = calendar.monthrange(int(year), int(month))
        current_date = date(int(year), int(month), total_days)
        association = Association.objects.get(id=assoc_id)
        investments = Investment.objects.filter(
            investor__association=association, date__lte=current_date,
        ).exclude(end_date__lt=current_date).order_by('-date')
        context = {
            'investments': investments, 'association': association,
            'month_name': MONTHS[int(month)-1], 'month': month, 'year': year,
        }
        response = TemplateResponse(
            request, 'entity/loan/excel/loans.html', context)
        filename = 'prestamos-%s.xls' % datetime.now().strftime('%y%m%d_%H%M')
        response['Content-Type'] = 'application/vnd.ms-excel; charset=utf-8'
        response['Content-Disposition'] = 'attachment; filename=%s' % filename
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
