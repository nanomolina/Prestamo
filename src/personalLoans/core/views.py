from django.shortcuts import render_to_response
from django.template import RequestContext
from django.template.response import TemplateResponse

def home(request):
    return render_to_response(
        'app/index.html',
        {},
        RequestContext(request)
    )

def main(request):
    return TemplateResponse(
        request,
        'views/main.html',
        {}
    )

def login(request):
    return TemplateResponse(
        request,
        'views/login.html',
        {}
    )

def logout(request):
    return TemplateResponse(
        request,
        'views/logout.html',
        {}
    )

def register(request):
    return TemplateResponse(
        request,
        'views/register.html',
        {}
    )
