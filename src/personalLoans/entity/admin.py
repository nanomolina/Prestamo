
from django.contrib import admin
from entity.models import Association, Investor


class AssociationAdmin(admin.ModelAdmin):
    fields = ('name', 'description', 'founder', 'partners')
admin.site.register(Association, AssociationAdmin)


class InvestorAdmin(admin.ModelAdmin):
    pass
admin.site.register(Investor, InvestorAdmin)
