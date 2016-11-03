#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.http import JsonResponse
from django.template.response import TemplateResponse
from rest_framework.decorators import api_view
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.generics import (ListCreateAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView)
from rest_framework.pagination import PageNumberPagination

from entity.models import Association, Investment, Investor, Revenue
from entity.serializers import (AssociationSerializer, InvestmentSerializer,
                                InvestorSerializer, RevenueSerializer,
                                TotalInvestmentSerializer, TotalRevenueSerializer)


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

    def get_serializer_context(self):
        from datetime import datetime
        date = datetime.now()
        return {"year": date.year, "month": date.month}


class InvestmentDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = InvestmentSerializer

    def get_queryset(self):
        assoc_id = self.kwargs['assoc_id']
        return Investment.objects.filter(investor__association__id=assoc_id)

    def get_serializer_context(self):
        from datetime import datetime
        date = datetime.now()
        return {"year": date.year, "month": date.month}


class RevenueList(ListAPIView):
    serializer_class = RevenueSerializer
    pagination_class = SetPagination
    filter_backends = (filters.OrderingFilter, filters.DjangoFilterBackend)
    filter_fields = ('investor', )
    ordering_fields = (
        'investor', 'period', 'capital', 'payment',
        'recovered', 'profit',
    )

    def get_queryset(self):
        assoc_id = self.kwargs['assoc_id']
        return Revenue.objects.filter(investor__association__id=assoc_id)


class TotalInvestments(ListAPIView):
    serializer_class = TotalInvestmentSerializer

    def get_queryset(self):
        from django.db.models import Sum, DecimalField
        assoc_id = self.kwargs['assoc_id']
        data = {
            'capital': 0.00,
            'final_capital': 0.00,
            'monthly_amount': 0.00,
            'profit': 0.00
        }
        investments = Investment.objects.filter(
            investor__association__id=assoc_id)
        data['capital'] = investments.aggregate(
            total=Sum('capital', output_field=DecimalField()))['total']
        data['final_capital'] = investments.aggregate(
            total=Sum('final_capital', output_field=DecimalField()))['total']
        data['monthly_amount'] = investments.aggregate(
            total=Sum('monthly_amount', output_field=DecimalField()))['total']
        data['profit'] = investments.aggregate(
            total=Sum('profit', output_field=DecimalField()))['total']
        return [data]


class TotalRevenues(ListAPIView):
    serializer_class = TotalRevenueSerializer

    def get_queryset(self):
        from django.db.models import Sum, DecimalField
        assoc_id = self.kwargs['assoc_id']
        investor_id = self.request.GET.get('investor')
        data = {
            'capital': 0.00,
            'payment': 0.00,
            'recovered': 0.00,
            'profit': 0.00
        }

        if investor_id:
            revenues = Revenue.objects.filter(
                investor__association__id=assoc_id, investor__id=investor_id)
        else:
            revenues = Revenue.objects.filter(
                investor__association__id=assoc_id)
        data['capital'] = revenues.aggregate(
            total=Sum('capital', output_field=DecimalField()))['total']
        data['payment'] = revenues.aggregate(
            total=Sum('payment', output_field=DecimalField()))['total']
        data['recovered'] = revenues.aggregate(
            total=Sum('recovered', output_field=DecimalField()))['total']
        data['profit'] = revenues.aggregate(
            total=Sum('profit', output_field=DecimalField()))['total']
        return [data]


def investment_export(request, assoc_id):
    if request.method == 'GET':
        from datetime import datetime, date
        import calendar
        from core.constant import MONTHS
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        exp_type = request.GET.get('type', None)
        weekday, total_days = calendar.monthrange(int(year), int(month))
        current_date = date(int(year), int(month), total_days)
        association = Association.objects.get(id=assoc_id)
        investments = Investment.objects.filter(
            investor__association=association, date__lte=current_date,
        ).exclude(end_date__lt=current_date).order_by('-date')
        context = {
            'investments': investments, 'association': association,
            'month_name': MONTHS[int(month)-1], 'month': month, 'year': year,
            'column_count': 8,
        }
        response = TemplateResponse(
            request, 'entity/loan/export/loans.html', context)
        if exp_type == 'excel':
            filename = 'prestamos-%s.xls' % datetime.now().strftime('%y%m%d_%H%M')
            response['Content-Type'] = 'application/vnd.ms-excel; charset=utf-8'
        elif exp_type == 'doc':
            filename = 'prestamos-%s.doc' % datetime.now().strftime('%y%m%d_%H%M')
            response['Content-Type'] = 'text/docx; charset=utf-8'
        else:
            return None
        response['Content-Disposition'] = 'attachment; filename=%s' % filename
        return response


def revenue_export(request, assoc_id):
    if request.method == 'GET':
        from datetime import datetime
        association = Association.objects.get(id=assoc_id)
        exp_type = request.GET.get('type', None)
        investor_id = request.GET.get('investor', None)
        ordering = request.GET.get('ordering', None)
        revenues = Revenue.objects.filter(investor__association=association)
        if investor_id:
            revenues = revenues.filter(investor__id=investor_id)
        if ordering:
            revenues = revenues.order_by(ordering)
        context = {
            'association': association,
            'revenues': revenues, 'column_count': 8,
        }
        response = TemplateResponse(
            request, 'entity/loan/export/revenue.html', context)
        if exp_type == 'excel':
            filename = 'redito-%s.xls' % datetime.now().strftime('%y%m%d_%H%M')
            response['Content-Type'] = 'application/vnd.ms-excel; charset=utf-8'
        elif exp_type == 'doc':
            filename = 'redito-%s.doc' % datetime.now().strftime('%y%m%d_%H%M')
            response['Content-Type'] = 'text/docx; charset=utf-8'
        else:
            return None
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
