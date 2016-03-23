from __future__ import unicode_literals

from django.db import models


class Words(models.Model):
    english_words = models.CharField(max_length=200)
    chinese_words = models.CharField(max_length=200)
    group = models.IntegerField(default=0)
