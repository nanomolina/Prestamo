#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.test import TestCase
from .models import *
import datetime
import calendar


class EntityMixins(object):
    def setUp(self):
        self.user = User.objects.create(
            username="fakeuser", password="1234",
            first_name="John", last_name="Snow",
            email="johnsnow@gmail.com"
        )
        self.association = Association.objects.create(
            name="House Stark",
            description= "House Stark of Winterfell is a Great House of Westeros",
            founder=self.user,
        )
        self.investor = Investor.objects.create(
            association=self.association,
            first_name=self.user.first_name, last_name=self.user.last_name,
            alias="Bastard", dni="37843234", email=self.user.email,
            birthdate=datetime.date(1990, 3, 15), gender='1',
        )
        self.investment = Investment.objects.create(
            investor=self.investor,
            warrant=100029,
            authorization=411,
            first_name="Juan",
            last_name="Perisit",
            capital=8500.00,
            final_capital=9792.00,
            fee=6,
            interests=15.20,
            monthly_amount=1632.00,
            date=datetime.date(2016, 10, 1)
        )


class EntityInitTest(EntityMixins, TestCase):
    def test_instance_setup(self):
        """
        Se asegura de que se los objetos se hayan instanciado correctamente.
        """
        self.assertIsInstance(self.user, User)
        self.assertIsInstance(self.association, Association)
        self.assertIsInstance(self.investor, Investor)
        self.assertIsInstance(self.investment, Investment)


class InvestmentModelTests(EntityMixins, TestCase):
    def test_valid_end_date(self):
        """
        Controla que la fecha de finalización de un prestamo sea correlativo a
        la cantidad de cuotas.
        """
        max_day = calendar.monthrange(2017, 4)[1]
        end_date = datetime.date(2017, 4, max_day)
        self.assertEqual(self.investment.end_date, end_date)

    def test_get_fee_with_same_month(self):
        """
        Si es un prestamo que se realizo en el mismo mes la cuota es
        la número 0.
        """
        current_fee = self.investment.get_current_fee(2016, 10)
        self.assertEqual(current_fee, 0)

    def test_get_fee_with_future_date(self):
        """
        Mediante pasan los meses la cuota debe ir aumentando
        """
        current_fee = self.investment.get_current_fee(2016, 11)
        self.assertEqual(current_fee, 1)
        current_fee = self.investment.get_current_fee(2016, 12)
        self.assertEqual(current_fee, 2)
        current_fee = self.investment.get_current_fee(2017, 1)
        self.assertEqual(current_fee, 3)
        current_fee = self.investment.get_current_fee(2017, 2)
        self.assertEqual(current_fee, 4)
        current_fee = self.investment.get_current_fee(2017, 3)
        self.assertEqual(current_fee, 5)
        current_fee = self.investment.get_current_fee(2017, 4)
        self.assertEqual(current_fee, 6)

    def test_get_fee_with_past_date(self):
        """
        Devuelve None porque es un prestamo que todavia no ocurrió.
        """
        current_fee = self.investment.get_current_fee(2016, 9)
        self.assertIsNone(current_fee)

    def test_none_fee_whit_future_date(self):
        """
        Devuelve None porque la fecha supera la cantidad de cuotas.
        """
        current_fee = self.investment.get_current_fee(2017, 5)
        self.assertIsNone(current_fee)
        current_fee = self.investment.get_current_fee(2018, 5)
        self.assertIsNone(current_fee)
