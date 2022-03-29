from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
import credentials
from countryinfo import CountryInfo
import wikipediaapi


#TODO Add cross-model data to db
# Books to authors
# Books to countries
# Authors to books
# Authors to countries
# Countries to authors
# Countries to books

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = credentials.db_login
db = SQLAlchemy(app)

# Define Country table/data model
class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_lat = db.Column(db.Float)
    country_long = db.Column(db.Float)
    country_demonym = db.Column(db.String())
    country_image = db.Column(db.String())

def __init__(self, country_name="NaN", country_region="NaN", capital_city="NaN", country_lat=0.0, country_long=0.0, country_demonym="NaN", country_image="NaN"):
    self.country_name = country_name
    self.country_region = country_region
    self.country_capital_city = capital_city
    self.country_lat = country_lat
    self.country_long = country_long
    self.demonym = country_demonym
    self.country_image = country_image

db.create_all()

# Get API request
request_url = 'http://api.worldbank.org/v2/countries/all?format=json&per_page=99999'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())

country_list = []
for item in data[1]:
    # Get valid regions
    if item["region"]["value"] != "Aggregates":
        # Account for case where there is no latitude or longitude
        new_country = Countries(country_name=item["name"], country_region=item["region"]["value"], country_capital_city=item['capitalCity'])
        if item["latitude"] != '':
            new_country.country_lat=item["latitude"]
        if item["latitude"] != '':
            new_country.country_long=item["longitude"]
        request_img_url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=' + urllib.parse.quote(new_country.country_name,safe='') + '&piprop=original'
        ri = urllib.request.urlopen(request_img_url)
        image = json.loads(ri.read())
        key = list(image['query']['pages'].keys())[0]
        image_id = image['query']['pages'][key]
        if 'original' in image_id:
            new_country.country_image=image_id['original']['source']
        info = CountryInfo(item['name'])
        if info is not None:
            try:
                new_country.country_demonym = info.demonym()
            except:
                pass
        country_list.append(new_country)

db.session.add_all(country_list)
db.session.commit()