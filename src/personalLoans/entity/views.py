from rest_framework.decorators import api_view
from rest_framework.response import Response
from entity.models import Association
from django.template.response import TemplateResponse


def investors_list(request):
    template = 'entity/investors.html'
    return TemplateResponse(
        request,
        template,
        {}
    )

@api_view()
def association_list(request):
    if request.method == 'GET':
        associations = Association.objects.all()
        names = [association.name for association in associations]
        return Response(names)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AssociationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        return JSONResponse(serializer.errors, status=400)
