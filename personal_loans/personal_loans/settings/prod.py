from .base import *

DEBUG = False

INSTALLED_APPS = INSTALLED_APPS + []

ALLOWED_HOSTS = ['your-server-ip-nanitox']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'personal_loans',
        'USER': 'admin',
        'PASSWORD': 'admin',
        'HOST': 'your-host-nanitox',
        'PORT': '',
    }
}