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
import shutil


rootdir_path_without_slash = '/home/winpc/test/python/node'
rootdir_path_with_slash= '/home/winpc/test/python/node/'


dir_src = (rootdir_path_with_slash)
for subdir, dirs, files in os.walk(rootdir_path_without_slash):
	for file in files:
		file_name=os.path.join(subdir, file)
		if file_name.endswith('.xx'):
			full_file_name = os.path.join(dir_src, file_name)
			full_destination=os.path.join(dir_src,file_name)
			if (os.path.isfile(full_file_name)):
				while os.path.exists(full_destination):
					full_destination += ".copy.txt"
				shutil.copy(full_file_name, full_destination)
					
				print colored('Coppying all html files with .copy ext...','green')
				for i in tqdm(range(100)):
	 				time.sleep(0.1)
