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
	apikey = '299c034012920f2e0a880131d68b369d0886ec1f'
	url = 'https://api.census.gov/data/2012/ewks?get=EMP,NAICS2012_TTL,OPTAX,GEO_TTL&for=place:*&in=state:06&in=county:001&NAICS2012=22&key='+apikey
	r = requests.get(url)
	print r
	r = r.json()
	pprint(r)
	
if __name__ == "__main__":
	main(sys.argv)