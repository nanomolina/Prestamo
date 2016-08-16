from rest_framework import serializers
from entity.models import Investor, Investment, Revenue, Association


class AssociationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Association
        fields = ('id', 'name', 'description')


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = ('user', 'associations', 'date_created', 'date_modified')


class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = ('investor', 'association', 'date', 'money')


class RevenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Revenue
        fields = ('investor', 'association', 'date', 'money')
