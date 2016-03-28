"""main URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.http import HttpResponse
from service.WordsService import WordsService


def index(request):
    f = open('../public/bootstrap-3.3.5-dist/index.html')
    content = f.read()
    f.close()
    return HttpResponse(content)

word_service = WordsService()


def get_all_word(request):
    page_index = request.GET.get('index')
    return HttpResponse(word_service.get_all_words(int(page_index)))


def regroup_word(request):
    word_service.regroup_all_words()
    return HttpResponse('{status:"success"}')


def group_number(request):
    data = word_service.get_all_group()
    return HttpResponse(data)


def get_word_by_group(request):
    page_index = request.GET.get('index')
    group_index = request.GET.get('group')
    return HttpResponse(word_service.get_words_by_group(page_index, group_index))


urlpatterns = [
    # url(r'spider/', get_all_word),
    url(r'^$', index, name='index'),
    url(r'all-word/$', get_all_word),
    url(r'regroup-word/$', regroup_word),
    url(r'group-number/$', group_number),
    url(r'group-word/$', get_word_by_group),
]
