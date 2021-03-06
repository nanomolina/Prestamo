# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-03 01:10
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Association',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Borrower',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('money', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('association', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entity.Association')),
            ],
        ),
        migrations.CreateModel(
            name='Investor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('associations', models.ManyToManyField(to='entity.Association')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Moneylender',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Revenue',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('money', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('association', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entity.Association')),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entity.Investor')),
            ],
        ),
        migrations.AddField(
            model_name='investment',
            name='investor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='entity.Investor'),
        ),
    ]
