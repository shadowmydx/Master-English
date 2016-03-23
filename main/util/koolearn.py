# -*- coding:utf-8 -*-
import re
import urllib2
from Models.models import Words


class Spider:

    def __init__(self):
        self.base_url = r'http://kaoyan.koolearn.com/20160120/885975.html'
        self.base_item_pattern = re.compile(r'<td height="30" align="center">(.*?)</td><td height="30" align="center">'
                                            r'<a href="(.*?)" target="_blank">(.*?)</a></td>', re.DOTALL)
        self.word_item_pattern = re.compile(r'<tr><td width="(.*?)" height="(.*?)">(.*?)'
                                            r'</td><td width="(.*?)" height="(.*?)">(.*?)</td></tr>', re.DOTALL)
        self.next_page_pattern = re.compile(r'<a target="_self" class="a1" href="(.*?)">(.*?)</a>', re.DOTALL)

    def get_all_words(self):
        f = urllib2.urlopen(self.base_url)
        content = f.read()
        results = self.base_item_pattern.findall(content)
        results = [single[1] for single in results]
        content_list = list()
        for url in results:
            print 'parsing new set..'
            content_list.append(self.get_all_words_from_url(url))
            print 'finished..'
        return results

    def get_all_words_from_url(self, url):
        while url is not None:
            content, url = self.get_content_from_current_url(url)
            print 'parse ' + str(len(content)) + ' words, get next page..'
            for item in content:
                word = Words(english_words=item[0], chinese_words=item[1])
                word.save()

    def get_content_from_current_url(self, url):
        retry = 10
        while retry >= 0:
            try:
                f = urllib2.urlopen(url)
                content = f.read()
                all_words = self.parse_all_words(content)
                if all_words is not None and len(all_words) != 0:
                    url = self.parse_new_url(content)
                else:
                    url = None
                return all_words, url
            except:
                retry -= 1
        return None, None

    def parse_all_words(self, content):
        all_words = self.word_item_pattern.findall(content)
        all_words = [(item[2], item[5]) for item in all_words]
        return all_words

    def parse_new_url(self, content):
        next_page = self.next_page_pattern.findall(content)
        for item in next_page:
            if item[1].find('下一页') != -1:
                if item[0].find('http') != -1:
                    return item[0]
        return None


if __name__ == '__main__':
    spider = Spider()

