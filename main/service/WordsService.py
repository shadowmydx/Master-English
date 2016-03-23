from Models.models import Words
import random
import json
from django.core import serializers
from django.db import transaction


GROUP_NUMBER = 10
PAGE_SIZE = 30


class WordsService:

    def __init__(self):
        pass

    @staticmethod
    @transaction.atomic
    def regroup_all_words():
        all_words = [item for item in Words.objects.all()]
        parts_size = len(all_words) / GROUP_NUMBER
        print len(all_words)
        random.shuffle(all_words)
        result_list = [all_words[i: i + parts_size] for i in xrange(0, len(all_words), parts_size)]
        start_group = 1
        for lists in result_list:
            for item in lists:
                item.group = start_group
                item.save()
            start_group += 1

    @staticmethod
    def get_all_words(index):
        index -= 1
        all_words = Words.objects.all()[index * PAGE_SIZE + 1: index * PAGE_SIZE + 1 + PAGE_SIZE]
        result_list = [serializers.serialize('json', [obj, ]) for obj in all_words]
        result_list = [json.loads(data) for data in result_list]
        return json.dumps(result_list)


