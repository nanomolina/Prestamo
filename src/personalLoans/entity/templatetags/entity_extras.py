from django import template
register = template.Library()

@register.simple_tag
def get_current_fee(investment, year, month):
    return investment.get_current_fee(year, month)
