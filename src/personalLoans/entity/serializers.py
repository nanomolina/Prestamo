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
        format=settings.DATE_FORMAT, input_formats=settings.DATE_INPUT_FORMATS
    )
    class Meta:
        model = Investor
        fields = (
            'association', 'first_name', 'last_name',
            'alias', 'dni', 'phone', 'email', 'birthdate',
            'gender', 'image_url',
            'date_created', 'gender_display'
        )


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = (
            'investor', 'warrant', 'authorization',
            'first_name', 'last_name', 'capital', 'final_capital',
            'fee', 'interests', 'date'
        )


class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = ('investor', 'association', 'date', 'money')
