from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://matt594:UACk3sfFZ337@bookrus.ccpec27yf35b.us-west-2.rds.amazonaws.com:5432/postgres'
db = SQLAlchemy(app)

# Define Country table/data model
class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_lat = db.Column(db.Float)
    country_long = db.Column(db.Float)

def __init__(self, country_name="NaN", country_region="NaN", capital_city="NaN", country_lat=0.0, country_long=0.0):
    self.country_name = country_name
    self.country_region = country_region
    self.country_capital_city = capital_city
    self.country_lat = country_lat
    self.country_long = country_long

db.create_all()

# Get API request
request_url = 'http://api.worldbank.org/v2/countries?format=json&&per_page=50'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())

country_list = []
for item in data[1]:
    # Get valid regions
    if item["region"]["value"] != "Aggregates":
        # Account for case where there is no latitude or longitude
        if item['latitude'] != '' or item['longitude'] != '':
            new_country = Country(country_name=item["name"], country_region=item["region"]["value"], country_capital_city=item['capitalCity'], country_lat=item["latitude"], country_long=item["longitude"])
            country_list.append(new_country)

db.session.add_all(country_list)
db.session.commit()