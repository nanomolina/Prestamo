
from django.contrib import admin
from entity.models import Association, Investor


class AssociationAdmin(admin.ModelAdmin):
    fields = ('name',)
admin.site.register(Association, AssociationAdmin)


class InvestorAdmin(admin.ModelAdmin):
    fields = ('user', 'associations')
admin.site.register(Investor, InvestorAdmin)
