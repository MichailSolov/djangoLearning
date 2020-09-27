from django.shortcuts import render
from django.http import HttpResponse
from .workspace import test


# Create your views here.
def posts_list(request):
    return render(request, 'blog/index.html')
