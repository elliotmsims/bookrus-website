from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import credentials
import wikipediaapi
import urllib
from os.path import exists
import requests
from countryinfo import CountryInfo


app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config["SQLALCHEMY_DATABASE_URI"] = credentials.db_login
db = SQLAlchemy(app)

# TODO Fill up the books data depending on authors in db
# TODO Add cross-model data to db
# Books to countries
# Authors to books
#   Add everything in books w/ author id to author pickle object
# Countries to books
#   Add everything in authors' books into country pickle object,
#   assuming authors-countries is done

# Define Author table/data model
class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String())
    author_birth_date = db.Column(db.String())
    author_death_date = db.Column(db.String())
    author_top_work = db.Column(db.String())
    author_work_count = db.Column(db.Integer)
    author_bio = db.Column(db.String())
    author_image = db.Column(db.String())
    author_country_id = db.Column(db.Integer)


def __init__(
    self,
    author_name="NaN",
    author_birth_date="NaN",
    author_death_date="NaN",
    author_top_work="NaN",
    author_work_count=0,
    author_bio="NaN",
    author_image="NaN",
    author_country_id=0,
):
    self.author_name = author_name
    self.author_birth_date = author_birth_date
    self.author_death_date = author_death_date
    self.author_top_work = author_top_work
    self.author_work_count = author_work_count
    self.author_bio = author_bio
    self.author_image = author_image
    self.author_country_id = author_country_id


def check_categories_keyword(page, keyword):
    for cat in page.categories.keys():
        if keyword in cat:
            return True
    return False


db.create_all()
id_to_country = {}
country_to_authors = {}
for i in range(1, 219):
    country_request_url = "http://localhost:5000/api/country/" + str(i)
    headers = {"Accept": "application/vnd.api+json"}
    cr = requests.get(country_request_url, headers=headers)
    cdata = json.loads(cr.content.decode("utf-8"))
    country = CountryInfo(cdata["data"]["attributes"]["country_name"])
    demonym = None
    try:
        demonym = country.demonym()
    except:
        demonym = cdata["data"]["attributes"]["country_name"]
    id_to_country[i] = demonym
authors_list = []
wiki = wikipediaapi.Wikipedia("en")
for i in range(1, 4394):
    author_request_url = "http://localhost:5000/api/author/" + str(i)
    headers = {"Accept": "application/vnd.api+json"}
    ar = requests.get(author_request_url, headers=headers)
    adata = json.loads(ar.content.decode("utf-8"))
    new_author = Author(**adata["data"]["attributes"])
    # Get Country ID
    page = wiki.page(adata["data"]["attributes"]["author_name"])
    categories = page.categories
    for j in id_to_country:
        if check_categories_keyword(page, id_to_country[j]):
            new_author.author_country_id = j
            if j not in country_to_authors:
                country_to_authors[j] = []
            country_to_authors[j].append(new_author.author_id)
            break
    authors_list.append(new_author)
    if len(authors_list) % 100 == 0:
        print("Appending db...")
        with open("country_to_authors.txt", "w") as file:
            for key in country_to_authors:
                print(key, country_to_authors[key], file=file)
        db.session.add_all(authors_list)
        db.session.commit()

with open("country_to_authors.txt", "w") as file:
    for key in country_to_authors:
        print(key, country_to_authors[key], file=file)

db.session.add_all(authors_list)
db.session.commit()
