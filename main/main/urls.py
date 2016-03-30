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
from util import SessionGenerator
import json


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
    result = dict()
    result['status'] = "success"
    return HttpResponse(json.dumps(result))


def group_number(request):
    data = word_service.get_all_group()
    return HttpResponse(data)


def get_word_by_group(request):
    page_index = request.GET.get('index')
    group_index = request.GET.get('group')
    return HttpResponse(word_service.get_words_by_group(page_index, group_index))


def start_etc_test(request):
    group_index = request.GET.get('group')
    if 'etc_start' not in request.session:
        request.session['etc_start'] = True
        SessionGenerator.SessionGenerator.add_item('etc_start', word_service.get_etc_words(group_index))
    try:
        generator = SessionGenerator.SessionGenerator.get_item('etc_start')
        result = generator.next()
        return HttpResponse(result)
    except StopIteration:
        result = dict()
        result['status'] = 'finished'
        request.session.pop('etc_start')
    except KeyError:
        result = dict()
        result['status'] = 'expired'
        request.session.pop('etc_start')
    return HttpResponse(json.dumps(result))


def end_test(request):
    test_type = request.GET.get('type')
    request.session.pop(test_type)
    result = dict()
    result['status'] = 'success'
    return HttpResponse(json.dumps(result))


urlpatterns = [
    # url(r'spider/', get_all_word),
    url(r'^$', index, name='index'),
    url(r'all-word/$', get_all_word),
    url(r'regroup-word/$', regroup_word),
    url(r'group-number/$', group_number),
    url(r'group-word/$', get_word_by_group),
    url(r'group-etc-test/$', start_etc_test),
    url(r'end-test/$', end_test),
]
