from entity.models import Association
from entity.serializers import AssociationSerializer
from django.template.response import TemplateResponse
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView


def render_partial(request, template_name):
    template = 'entity/%s' % (template_name)
    return TemplateResponse(
        request, template, {}
    )


class AssociationList(ListCreateAPIView):
    queryset =  Association.objects.all()
    serializer_class = AssociationSerializer


class AssociationDetail(RetrieveUpdateAPIView):
    queryset = Association.objects.all()
    serializer_class = AssociationSerializer
