import csv
import requests
import sys
from census import Census
from us import states
import numpy as np
from collections import defaultdict
from collections import OrderedDict

def main(args):
	print "HELLLLLLO"

	apikey = '299c034012920f2e0a880131d68b369d0886ec1f'
	url = args[1] + '&key=' + apikey
	
	r = requests.get(url)
	print r.text
	file1 = open('data/nationalcountydata/2009.csv', 'a')
	writer = csv.writer(file1)


if __name__ == "__main__":
	main(sys.argv)