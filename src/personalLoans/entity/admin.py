
from django.contrib import admin
from entity.models import Association

class AssociationAdmin(admin.ModelAdmin):
    fields = ('name',)
admin.site.register(Association, AssociationAdmin)
