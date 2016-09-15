from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models



class Association(models.Model):
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=250, null=True, blank=True)
    founder = models.ForeignKey(User, null=True, blank=True, related_name="association_founder_set")
    partners = models.ManyToManyField(User, related_name="association_partner_set")

    date_created = models.DateField(auto_now_add=True, null=True, blank=True)
    date_modified = models.DateField(auto_now=True, null=True, blank=True)

    def __unicode__(self):
        return "%s" % (self.name)


class Investor(models.Model):
    GENDER = (
        (1, 'Masculino'), (2, "Femenino")
    )
    association = models.ForeignKey(Association, null=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    gender = models.SmallIntegerField(choices=GENDER, blank=True, null=True)
    image_url = models.URLField(null=True, blank=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s - %s %s" % (self.association, self.first_name, self.last_name)


class Investment(models.Model):
    investor = models.ForeignKey(Investor)
    date = models.DateField()
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)


class Revenue(models.Model):
    investor = models.ForeignKey(Investor)
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
