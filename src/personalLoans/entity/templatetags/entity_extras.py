from django import template
register = template.Library()

@register.simple_tag
def getCurrentFee(investment, year, month):
    return investment.getCurrentFee(year, month)
