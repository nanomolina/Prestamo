# DATABASE SIGNALS
from django.db.models.signals import post_save
from django.dispatch import receiver
from entity.models import Investment, Revenue
from datetime import date
from decimal import Decimal
from calendar import monthrange


@receiver(post_save, sender=Investment)
def handler_new_investment(sender, instance, **kwargs):
    instance_year = instance.date.year
    instance_month = instance.date.month
    revenue_exist =  Revenue.objects.filter(
        investor=instance.investor,
        period__year=instance_year,
        period__month=instance_month,
    ).exists()
    if not revenue_exist:
        revenue = Revenue.objects.create(
            investor=instance.investor,
            period=date(instance_year, instance_month, 1),
            capital=Decimal(instance.capital),
        )
        max_day = monthrange(instance_year, instance_month)[1]
        instance_period = date(instance_year, instance_month, max_day)
        investments = Investment.objects.filter(
            date__lte=instance_period
        ).exclude(
            end_date__lt=instance_period, id=instance.id
        )
        payment = recovered = profit = Decimal('0')
        for inv in investments:
            payment += Decimal(inv.monthly_amount)
            recovered += Decimal(inv.capital) / Decimal(inv.fee)
            profit += Decimal(inv.monthly_amount) - (Decimal(inv.capital) / Decimal(inv.fee))
        revenue.payment = Decimal(unicode(round(payment, 2)))
        revenue.recovered = Decimal(unicode(round(recovered, 2)))
        revenue.profit = Decimal(unicode(round(profit, 2)))
        revenue.save()
    else:
        revenue = Revenue.objects.get(
            investor=instance.investor,
            period__year=instance_year,
            period__month=instance_month,
        )
