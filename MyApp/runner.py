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


#backup all html files
subprocess.call("python cpy_html_file.py",shell=True)

#To send and recognize the code base save out put to a text file
print colored('Reading Your Web Content....','red')
for i in tqdm(range(100)):
	 time.sleep(0.1)

process = subprocess.Popen("docker run --rm wappalyzer/cli https://www.w3schools.com/", stdout = subprocess.PIPE, shell = True)
(process_output,  error) = process.communicate()

file = open('AllWebContent.txt', "w")
file.write(process_output)
file.close()
print colored('Copping Your Web Content....','yellow')
for i in tqdm(range(100)):
	 time.sleep(0.1)


#Read the text file and convert it to json
file = open("AllWebContent.txt", "r") 
x = file.read() 
d = json.loads(x)

#Read entire text file and extract only the names in the text
print colored('Extracting All the Technology Stack....','green')
for i in tqdm(range(100)):
	 time.sleep(0.1)

orig_stdout = sys.stdout
f = open('names.txt', 'w')
sys.stdout = f

for criteria in d['applications']:
    for key, value in criteria.iteritems():
        print key, 'is:', value
    print ''

sys.stdout = orig_stdout
f.close()

text_file = open("onlyNames.txt", "w")
shakes = open("names.txt", "r")
for line in shakes:
    if re.match("(.*)name(.*)", line):
        text_file.write(line)
	
text_file.close()

#Get the names and put that into an array
fileOnlyNames = open("onlyNames.txt", "r") 
onlyNames = fileOnlyNames.read() 
text = onlyNames.split('\n')
print colored('Searching the Technology....','red')
for i in tqdm(range(100)):
	 time.sleep(0.1)

for i in text:
	if i == "name is: EdgeCas":
		print colored('Deploying Your Node App....','red')
		for i in tqdm(range(100)):
	        	time.sleep(0.1)
		print os.getcwd()

		os.chdir("/home/winpc/pms/TeamManagement/Client/ptm_web")
		print os.getcwd()

		print colored('Copping Docker File....','red')
		for i in range(100+1):
    			time.sleep(0.1)
    			sys.stdout.write(('='*i)+(''*(100-i))+("\r [ %d"%i+"% ] "))
    			sys.stdout.flush()
		subprocess.call("cp /home/winpc/test/python/nodeDocker/Dockerfile /home/winpc/test/python/node",shell=True)

		print colored('Stopping All Running Containers...','red')
		for i in tqdm(range(100)):
	        	time.sleep(0.1)
		subprocess.call("docker stop $(docker ps -aq)",shell=True)
		
		print colored('Building the Docker file...','red')
		for i in tqdm(range(100)):
	 		time.sleep(0.1)
		subprocess.call("docker build -t win5/node-web-app3 .",shell=True)

		print colored('Deploying the Application...','red')
		for i in tqdm(range(100)):
	 		time.sleep(0.1)
		subprocess.call("docker run -p 49160:8080 -d win5/node-web-app3",shell=True)
		print ("Openning the Chrome Browser....")
		for i in tqdm(range(100)):
	 		time.sleep(0.1)
		
	if i == "name is: Microsoft ASP.NET":
		print colored('Deploying Your Laravel App....','red')
		for i in tqdm(range(10)):
	        	time.sleep(0.1)
		print os.getcwd()
		
		os.chdir("/home/winpc/test/lar/blog")
		print os.getcwd()

		print colored('Copping Docker File....','red')
		for i in range(100+1):
    			time.sleep(0.1)
    			sys.stdout.write(('='*i)+(''*(100-i))+("\r [ %d"%i+"% ] "))
    			sys.stdout.flush()
		subprocess.call("cp /home/winpc/test/laravelDocker/Dockerfile /home/winpc/test/python/laravel",shell=True)

		print colored('Stopping All Running Containers...','red')
		for i in tqdm(range(100)):
	        	time.sleep(0.1)
		subprocess.call("docker stop $(docker ps -aq)",shell=True)

		print colored('Building the Docker file...','red')
		for i in tqdm(range(100)):
	 		time.sleep(0.1)
		subprocess.call("docker build -t win110/lar-web-app1 .",shell=True)

		print colored('Deploying the Application...','red')
		for i in tqdm(range(100)):
	 		time.sleep(0.1)
		subprocess.call("docker run -p 49160:8181 -d win110/lar-web-app1",shell=True)

		print ("Openning the Chrome Browser....")
		for i in tqdm(range(100)):
	 		time.sleep(0.1)

subprocess.call("python /home/winpc/test/python/MyApp/web_nav.py",shell=True)




	
