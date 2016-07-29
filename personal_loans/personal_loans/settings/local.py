from .base import *

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = INSTALLED_APPS + [
    'django_extensions',
    'debug_toolbar'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'personal_loans',
    }
}
