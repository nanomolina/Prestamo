from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.response import TemplateResponse
from rest_framework.generics import ListAPIView

from core.serializers import SocialUserSerializer
from allauth.socialaccount.models import SocialAccount
from entity.models import Investor


def home(request):
    return render_to_response(
        'app/index.html',
        {},
        RequestContext(request)
    )

def render_partial(request, template_name):
    template = 'core/%s' % (template_name)
    return TemplateResponse(
        request,
        template,
        {}
    )

class SocialUserList(ListAPIView):
    serializer_class = SocialUserSerializer

    def get_queryset(self):
        return SocialAccount.objects.filter(user=self.request.user)
