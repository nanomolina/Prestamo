from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.response import TemplateResponse

def home(request):
    return render_to_response('app/index.html', {}, RequestContext(request))

def render_partial(request, template_name):
    template = 'app/views/%s' % (template_name)
    return TemplateResponse(request, template, {})
