#!/usr/bin/python
import subprocess
import json
import os
import re
import sys
from pyvirtualdisplay import Display
from selenium import webdriver
from sh import cd, ls
import time
from tqdm import tqdm
from termcolor import colored

d = webdriver.Chrome()
d.get("http://0.0.0.0:49160")
list_links = d.find_elements_by_tag_name('a')

for i in list_links:
        print i.get_attribute('href')

time.sleep(5)
d.quit()
