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
	with open('data/nationalcountydata/counties2.json') as data_file:    
		data = json.load(data_file)
	#pprint(data['features'][0])
	asiansperyear = defaultdict(list)
	totalperyear = defaultdict(list)
	percentperyear = defaultdict(list)
	apikey = '299c034012920f2e0a880131d68b369d0886ec1f'
	
	
	wadecounty = ('02','270')
	kusilvak = ('02','158')
	oglala = ('46', '102')
	shannon = ('46', '113')
	bedfordcity = ('51', '515')
	bedfordcounty = ('51', '019')
	for i in range(2009, 2016):
		if (i == 2015):
			url = 'https://api.census.gov/data/2015/acs/acs5?get=NAME,B02011_001E&for=county:*&in=state:*&key=' + apikey
			url2 = 'https://api.census.gov/data/2015/acs/acs5?get=NAME,B01001_001E&for=county:*&in=state:*&key=' + apikey
		else:
			url = 'https://api.census.gov/data/' + str(i) + '/acs5?get=NAME,B02011_001E&for=county:*&in=state:*&key=' + apikey
			url2 = 'https://api.census.gov/data/' + str(i) + '/acs5?get=NAME,B01001_001E&for=county:*&in=state:*&key=' + apikey
		r = requests.get(url)
		r2 = requests.get(url2)
		r = r.json()
		r2 = r2.json()
		for j in range(1, len(r)):
			row = r[j]
			statecounty = (row[2], row[3])
			if statecounty == wadecounty:
				asiansperyear[kusilvak].append(float(row[1]))
			elif statecounty == shannon:
				asiansperyear[oglala].append(int(row[1]))
			elif statecounty == bedfordcity:
				asiansperyear[bedfordcounty][len(asiansperyear[bedfordcounty])-1] += (int(row[1]))
			else:
				asiansperyear[statecounty].append(int(row[1]))
		for j in range(1, len(r2)):
			row = r2[j]
			statecounty = (row[2], row[3])
			if statecounty == wadecounty:
				totalperyear[kusilvak].append(float(row[1]))
			elif statecounty == shannon:
				totalperyear[oglala].append(int(row[1]))
			elif statecounty == bedfordcity:
				totalperyear[bedfordcounty][len(asiansperyear[bedfordcounty])-1] += (int(row[1]))
			else:
				totalperyear[statecounty].append(int(row[1]))

	for k,v in totalperyear.iteritems():
		if len(v) != 7:
			print k,v
	for k,v in asiansperyear.iteritems():
		for j in range(len(v)):
			percentperyear[k].append(float(asiansperyear[k][j])/float(totalperyear[k][j]))

	
	for k,v in percentperyear.iteritems():
		print k,v


	for i in range(len(data['features'])):
		county = data['features'][i]
		properties = county['properties']
		statefp = properties['STATEFP']
		countyfp = properties['COUNTYFP']
		for j in range(2009, 2016):
			properties[str(j)] = percentperyear[(statefp,countyfp)][j-2009]

	#pprint(data['features'])


	with open('data/nationalcountydata/countieswpercentdata.json', 'w') as fp:
		json.dump(data, fp)



	
	

	
	


if __name__ == "__main__":
	main(sys.argv)