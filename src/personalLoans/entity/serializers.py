from django.conf import settings
from rest_framework import serializers

from entity.models import Association, Investment, Investor, Revenue


class AssociationSerializer(serializers.ModelSerializer):
    # founder = serializers.ReadOnlyField(source='founder.user.get_full_name')
    # date_created = serializers.ReadOnlyField(source='date_created')
    founder_name = serializers.ReadOnlyField(source='founder.get_full_name')
    class Meta:
        model = Association
        fields = (
            'id', 'name', 'description',
            'founder', 'founder_name', 'date_created'
        )


class InvestorSerializer(serializers.ModelSerializer):
    gender_display = serializers.ReadOnlyField(
        source='get_gender_display'
    )
    birthdate = serializers.DateField(
        format=settings.DATE_FORMAT,
        input_formats=settings.DATE_INPUT_FORMATS
    )
    class Meta:
        model = Investor
        fields = (
            'association', 'id', 'first_name', 'last_name',
            'alias', 'dni', 'phone', 'email', 'birthdate',
            'gender', 'image_url',
            'date_created', 'gender_display'
        )


class InvestmentSerializer(serializers.ModelSerializer):
    date = serializers.DateField(
        format=settings.DATE_FORMAT,
        input_formats=settings.DATE_INPUT_FORMATS
    )
    current_fee = serializers.SerializerMethodField('get_current_fee_serializer')
    fee_time = serializers.SerializerMethodField('fee_past_or_future_serializer')
    investor__full_name = serializers.SerializerMethodField('investor_full_name')

    class Meta:
        model = Investment
        fields = (
            'investor', 'investor__full_name', 'warrant', 'authorization',
            'first_name', 'last_name', 'capital', 'final_capital',
            'profit', 'fee', 'interests', 'monthly_amount', 'date',
            'current_fee', 'fee_time',
        )

    def get_current_fee_serializer(self, obj):
        year = self.context.get('year')
        month = self.context.get('month')
        return obj.get_current_fee(year, month)

    def fee_past_or_future_serializer(self, obj):
        year = self.context.get('year')
        month = self.context.get('month')
        return obj.fee_past_or_future(year, month)

    def investor_full_name(self, obj):
        return obj.investor.full_name


class RevenueSerializer(serializers.ModelSerializer):
    investor__full_name = serializers.SerializerMethodField('investor_full_name')

    class Meta:
        model = Revenue
        fields = (
            'investor', 'investor__full_name', 'period', 'capital', 'payment',
            'recovered', 'profit'
        )

    def investor_full_name(self, obj):
        return obj.investor.full_name


class TotalInvestmentSerializer(serializers.Serializer):
    capital = serializers.DecimalField(allow_null=True, decimal_places=2, max_digits=10, required=False)
    final_capital = serializers.DecimalField(allow_null=True, decimal_places=2, max_digits=10, required=False)
    monthly_amount = serializers.DecimalField(allow_null=True, decimal_places=2, max_digits=10, required=False)
    profit = serializers.DecimalField(allow_null=True, decimal_places=2, max_digits=10, required=False)
