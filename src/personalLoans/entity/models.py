from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models


class Association(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True, blank=True)
    founder = models.ForeignKey('Investor', null=True, blank=True)

    def __unicode__(self):
        return "%s" % (self.name)


class Investor(models.Model):
    user = models.OneToOneField(User)
    associations = models.ManyToManyField(Association)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.user.get_full_name())


class Investment(models.Model):
    investor = models.ForeignKey(Investor)
    association = models.ForeignKey(Association)
    date = models.DateField()
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)


class Revenue(models.Model):
    investor = models.ForeignKey(Investor)
    association = models.ForeignKey(Association)
    date = models.DateField()
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)


class Moneylender(models.Model):
    pass


class Borrower(models.Model):
    pass
