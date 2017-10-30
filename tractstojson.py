import csv
import requests
import sys
import json
from pprint import pprint
from census import Census
from us import states
import numpy as np
from collections import defaultdict
from collections import OrderedDict


def main(args):
	statefips = args[1]
	countyfips = args[2]
	print statefips
	print countyfips

	with open('data/LAcountytractdata/lacounty.json') as data_file:    
		data = json.load(data_file)
	print pprint(data['features'][0])
	asiansperyear = defaultdict(list)
	totalperyear = defaultdict(list)
	percentperyear = defaultdict(list)
	apikey = '299c034012920f2e0a880131d68b369d0886ec1f'

	old = '930401'
	merged = '137000'
	for i in range(2010, 2016):
		if (i == 2015):
			url = 'https://api.census.gov/data/2015/acs/acs5?get=NAME,B02011_001E&for=tract:*&in=state:'+statefips+'%20county:' + countyfips + '&key=' + apikey
			url2 = 'https://api.census.gov/data/2015/acs/acs5?get=NAME,B01001_001E&for=tract:*&in=state:'+statefips+'%20county:' + countyfips + '&key=' + apikey
		else:	
			url = 'https://api.census.gov/data/' + str(i) + '/acs5?get=NAME,B02011_001E&for=tract:*&in=state:'+statefips+'%20county:' + countyfips + '&key=' + apikey
			url2 = 'https://api.census.gov/data/' + str(i) + '/acs5?get=NAME,B01001_001E&for=tract:*&in=state:'+statefips+'%20county:' + countyfips + '&key=' + apikey
		r = requests.get(url)
		r2 = requests.get(url2)
		r = r.json()
		r2 = r2.json()



		for j in range(1, len(r)):
			row = r[j]
			if row[4] == old:
				asiansperyear[statefips + countyfips + merged].append(int(row[1]))
			else: 
				asiansperyear[statefips + countyfips + row[4]].append(int(row[1]))

		for j in range(1, len(r2)):
			row = r2[j]
			if row[4] == old:
				totalperyear[statefips + countyfips + merged].append(int(row[1]))
			else: 
				totalperyear[statefips + countyfips + row[4]].append(int(row[1]))

	for k,v in asiansperyear.iteritems():
		if len(v) != 6:
			print k,v

	for k,v in totalperyear.iteritems():
		if len(v) != 6:
			print k,v

	for k,v in asiansperyear.iteritems():
		for j in range(len(v)):
			if totalperyear[k][j] == 0:
				percentperyear[k].append(0)
			else:
				percentperyear[k].append(float(asiansperyear[k][j])/float(totalperyear[k][j]))

	for i in range(len(data['features'])):
		county = data['features'][i]
		properties = county['properties']
		geoid = properties['external_id']
		for j in range(2010, 2016):
			properties[str(j)] = percentperyear[geoid][j-2010]

	pprint(data['features'])


	with open('data/LAcountytractdata/lacounty.json', 'w') as fp:
		json.dump(data, fp)




if __name__ == "__main__":
	main(sys.argv)