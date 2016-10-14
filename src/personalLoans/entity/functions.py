#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from django.conf import settings
import datetime
import calendar


def filter_files(directory, extention):
    list_files = os.listdir(directory)
    for lfile in list_files:
        if not lfile.endswith(extention):
            list_files.remove(lfile)
    root_dir = os.path.join(settings.STATIC_ROOT, '')
    directory = directory.replace(root_dir, '')
    directory = os.path.join('static', directory)
    return [os.path.join(directory, f) for f in list_files]


def add_months(sourcedate,months):
    """
    Suma los meses mencionados months y coloca el ultimo dia del mes
    """
    month = sourcedate.month - 1 + months
    year = int(sourcedate.year + month / 12 )
    month = month % 12 + 1
    day = calendar.monthrange(year,month)[1]
    return datetime.date(year,month,day)
