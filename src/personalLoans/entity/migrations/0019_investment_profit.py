# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-17 00:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0018_investment_end_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='investment',
            name='profit',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True, verbose_name='Ganancia'),
        ),
    ]
