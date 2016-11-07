from django.conf import settings
from rest_framework import serializers

from rest_auth.serializers import UserDetailsSerializer
from allauth.socialaccount.models import SocialAccount


class SocialUserSerializer(serializers.ModelSerializer):
    user = UserDetailsSerializer()
    class Meta:
        model = SocialAccount
        fields = (
            'get_avatar_url', 'user',
        )
