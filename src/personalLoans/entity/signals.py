# DATABASE SIGNALS
from django.db.models.signals import post_save
from django.dispatch import receiver
from entity.models import Investment, Revenue
from decimal import Decimal
from entity.functions import add_months


@receiver(post_save, sender=Investment)
def handler_new_investment(sender, instance, **kwargs):
    for fee_month in range(instance.fee + 1):
        revenue, created = Revenue.objects.get_or_create(
            investor=instance.investor,
            period=add_months(instance.date, fee_month),
        )
        revenue.investment = instance
        if fee_month == 0:
            revenue.capital = Decimal(revenue.capital) + Decimal(instance.capital)
        else:
            revenue.payment = Decimal(revenue.payment) + Decimal(instance.monthly_amount)
            revenue.recovered = Decimal(revenue.recovered) + (Decimal(instance.capital) / Decimal(instance.fee))
            revenue.profit = Decimal(revenue.profit) + (Decimal(instance.monthly_amount) - (Decimal(instance.capital) / Decimal(instance.fee)))
        revenue.save()
