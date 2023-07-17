from django.http import HttpResponse
from django.template import loader

def cesium_viewer(request):
    template = loader.get_template('csviewer/viewer.html')
    return HttpResponse(template.render())