#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os

def filter_files(directory, extention):
    list_files = os.listdir(directory)
    for lfile in list_files:
        if not lfile.endswith(extention):
            list_files.remove(lfile)
    return list_files
