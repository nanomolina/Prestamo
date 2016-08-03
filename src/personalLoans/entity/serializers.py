from rest_framework import serializers
from entity.models import Investor, Investment, Revenue, Association


class AssociationSerializer(serializers.Serializer):
    class Meta:
        model = Association
        fields = ('name')


class InvestorSerializer(serializers.Serializer):
    class Meta:
        model = Investor
        fields = ('user', 'associations', 'date_created', 'date_modified')


class InvestmentSerializer(serializers.Serializer):
    class Meta:
        model = Investment
        fields = ('investor', 'association', 'date', 'money')


class RevenueSerializer(serializers.Serializer):
    class Meta:
        model = Revenue
        fields = ('investor', 'association', 'date', 'money')
