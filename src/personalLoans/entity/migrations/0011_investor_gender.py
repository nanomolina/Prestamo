# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-09-15 03:50
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0010_auto_20160914_1737'),
    ]

    operations = [
        migrations.AddField(
            model_name='investor',
            name='gender',
            field=models.SmallIntegerField(blank=True, choices=[(1, 'Masculino'), (2, 'Femenino')], null=True),
        ),
    ]
