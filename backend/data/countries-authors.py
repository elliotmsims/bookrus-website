from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import credentials
from os.path import exists
import requests

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config["SQLALCHEMY_DATABASE_URI"] = credentials.db_login
db = SQLAlchemy(app)


class Countries(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_lat = db.Column(db.Float)
    country_long = db.Column(db.Float)
    country_demonym = db.Column(db.String())
    country_image = db.Column(db.String())
    country_authors = db.Column(db.String())
    country_description = db.Column(db.String())
    country_languages = db.Column(db.String())
    country_population = db.Column(db.Integer)


def __init__(
    self,
    country_name="NaN",
    country_region="NaN",
    capital_city="NaN",
    country_lat=0.0,
    country_long=0.0,
    country_demonym="NaN",
    country_image="NaN",
    country_authors="NaN",
    country_description="NaN",
    country_languages="NaN",
    country_population=0,
):
    self.country_name = country_name
    self.country_region = country_region
    self.country_capital_city = capital_city
    self.country_lat = country_lat
    self.country_long = country_long
    self.demonym = country_demonym
    self.country_image = country_image
    self.country_authors = country_authors
    self.country_description = country_description
    self.country_languages = country_languages
    self.country_population = country_population


db.create_all()
countries_list = []
d = {}
with open('country_to_authors.txt', 'r') as file:
    for line in file:
        (key, val) = line.split(" ", 1)
        val = val.replace('[', '').replace(']','').split(",")
        val = [int(num) for num in val]  
        if key != 'None':
            d[int(key)] = val
for i in range(1, 219):
    country_request_url = "http://localhost:5000/country/" + str(i)
    headers = {"Accept": "application/vnd.api+json"}
    cr = requests.get(country_request_url, headers=headers)
    cdata = json.loads(cr.content.decode("utf-8"))
    new_country = Countries(**cdata["data"]["attributes"])
    if i in d:
        serialized = json.dumps(d[i])
        new_country.country_authors = serialized
    countries_list.append(new_country)

db.session.add_all(countries_list)
db.session.commit()
