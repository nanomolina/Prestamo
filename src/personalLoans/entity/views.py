from entity.models import Association
from entity.serializers import AssociationSerializer
from django.template.response import TemplateResponse
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


def render_partial(request, template_name):
    template = 'entity/%s' % (template_name)
    return TemplateResponse(
        request, template, {}
    )


class AssociationList(ListCreateAPIView):
    serializer_class = AssociationSerializer

    def get_queryset(self):
        investor = self.request.user.investor
        return investor.associations.all()

    def post(self, request, *args, **kwargs):
        request.data['founder'] = request.user.investor.id
        response = self.create(request, *args, **kwargs)
        investor = request.user.investor
        investor.associations.add(response.data['id'])
        return response


class AssociationDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = AssociationSerializer

    def get_queryset(self):
        investor = self.request.user.investor
        return investor.associations.all()
