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
    serializer_class = AssociationSerializer

    def get_queryset(self):
        investor = self.request.user.investor
        return investor.associations.all()

    def post(self, request, *args, **kwargs):
        request.data['founder'] = request.user.id
        response = self.create(request, *args, **kwargs)
        investor = request.user.investor
        id_new_assoc = response.data.get('id')
        investor.associations.add(id_new_assoc)
        return response


class AssociationDetail(RetrieveUpdateAPIView):
    serializer_class = AssociationSerializer

    def get_queryset(self):
        investor = self.request.user.investor
        return investor.associations.all()
