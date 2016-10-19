#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class Association(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True, blank=True)
    founder = models.ForeignKey(User, null=True, blank=True, related_name="association_founder_set")
    partners = models.ManyToManyField(User, related_name="association_partner_set")

    date_created = models.DateField(auto_now_add=True, null=True, blank=True)
    date_modified = models.DateField(auto_now=True, null=True, blank=True)

    def __unicode__(self):
        return "%s" % (self.name)


class Investor(models.Model):
    GENDER = (
        ('1', 'Masculino'), ('2', 'Femenino')
    )
    association = models.ForeignKey(Association, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    alias = models.CharField(max_length=30, null=True, blank=True)
    dni = models.PositiveSmallIntegerField(blank=True, null=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER)
    image_url = models.CharField(max_length=200, null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s - %s %s" % (self.association, self.first_name, self.last_name)


class Investment(models.Model):
    FEES = (
        (1, '1'), (3, '3'), (6, '6'), (12, '12')
    )
    investor = models.ForeignKey(Investor, verbose_name="Inversor")
    warrant = models.PositiveIntegerField('N° Orden', unique=True, null=True)
    authorization = models.PositiveIntegerField('N° Autorización', unique=True, null=True)
    first_name = models.CharField('Nombre', max_length=30, blank=True)
    last_name = models.CharField('Apellido', max_length=30, blank=True)
    capital = models.DecimalField('Capital', max_digits=10, decimal_places=2, default=0)
    final_capital = models.DecimalField('Capital final', max_digits=10, decimal_places=2, null=True, blank=True)
    profit = models.DecimalField('Ganancia', max_digits=10, decimal_places=2, null=True, blank=True)
    fee = models.SmallIntegerField('Cuotas', choices=FEES, default=0)
    interests = models.DecimalField('Intereses', max_digits=5, decimal_places=2, default=0)
    monthly_amount = models.DecimalField('Importe mensual', max_digits=10, decimal_places=2, null=True, blank=True)
    date = models.DateField('Creación')
    end_date = models.DateField('Fin del prestamo', null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)

    def save(self, *args, **kwargs):
        if self.pk is None:
            from entity.functions import add_months
            self.end_date = add_months(self.date, self.fee)
            super(Investment, self).save(*args, **kwargs)

    @property
    def investor_full_name(self):
        name = ''
        # if self.investor.alias:
        #     name += self.investor.alias
        # else:
        name += self.investor.first_name
        name += ' ' + self.investor.last_name
        return name

    def get_current_fee(self, year, month):
        from datetime import date
        from entity.functions import monthdelta
        current_date = date(int(year), int(month), self.date.day)
        if self.date <= current_date <= self.end_date:
            fee = monthdelta(self.date, current_date)
        else:
            fee = None
        return fee

    def fee_past_or_future(self, year, month):
        from datetime import date
        from calendar import monthrange
        last_day = monthrange(year, month)[1]
        current_date = date(int(year), int(month), last_day)
        if self.date <= current_date <= self.end_date:
            fee_time = 'now'
        elif self.date > current_date:
            fee_time = 'future'
        else: #self.end_date < current_date
            fee_time = 'past'
        return fee_time


class Revenue(models.Model):
    investor = models.ForeignKey(Investor, verbose_name="Inversor")
    period = models.DateField('Periodo')
    capital = models.DecimalField('Prestado', max_digits=10, decimal_places=2, default=0)
    payment = models.DecimalField('Capital por cuotas', max_digits=10, decimal_places=2, default=0)
    recovered = models.DecimalField('Recuperado', max_digits=10, decimal_places=2, default=0)
    profit = models.DecimalField('Ganancia', max_digits=10, decimal_places=2, default=0)

    def __unicode__(self):
        return "%s - %s" % (self.investor, self.period)
