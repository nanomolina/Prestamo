# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-14 20:37
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('entity', '0009_auto_20160914_1730'),
    ]

    operations = [
        migrations.AddField(
            model_name='association',
            name='partners',
            field=models.ManyToManyField(related_name='association_partner_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='association',
            name='founder',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='association_founder_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
