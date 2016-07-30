from __future__ import unicode_literals

from django.db import models

class Investor(models.Model):
    user = models.OneToOneField(User)
    associations = models.ManyToManyField(InvestorAssociation)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.user)


class Investment(models.Model):
    investor = models.ForeignKey(Investor)
    association = models.ForeignKey(InvestorAssociation)
    date = models.DateField()
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)


class Revenue(models.Model):
    investor = models.ForeignKey(Investor)
    association = models.ForeignKey(InvestorAssociation)
    date = models.DateField()
    money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return "%s" % (self.investor)


class InvestorAssociation(models.Model):
    name = models.CharField(max_length=250)

    def __unicode__(self):
        return "%s" % (self.name)


class Moneylender(models.Model):
    pass


class Borrower(models.Model):
    pass
