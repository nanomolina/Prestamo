# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-16 18:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entity', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='association',
            name='description',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
