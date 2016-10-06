#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

from django.conf import settings


def filter_files(directory, extention):
    list_files = os.listdir(directory)
    for lfile in list_files:
        if not lfile.endswith(extention):
            list_files.remove(lfile)
    root_dir = os.path.join(settings.STATIC_ROOT, '')
    directory = directory.replace(root_dir, '')
    directory = os.path.join('static', directory)
    return [os.path.join(directory, f) for f in list_files]
