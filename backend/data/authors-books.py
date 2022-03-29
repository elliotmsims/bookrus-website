from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import json
import credentials
import wikipediaapi
import urllib
from os.path import exists
import requests

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config['SQLALCHEMY_DATABASE_URI'] = credentials.db_login
db = SQLAlchemy(app)

# Define Author table/data model
class Authors(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String())
    author_birth_date = db.Column(db.String())
    author_death_date = db.Column(db.String())
    author_top_work = db.Column(db.String())
    author_work_count = db.Column(db.Integer)
    author_bio = db.Column(db.String())
    author_image = db.Column(db.String())
    author_country_id = db.Column(db.Integer)
    author_books = db.Column(db.String())

def __init__(self, author_name="NaN", author_birth_date="NaN", author_death_date="NaN", author_top_work="NaN", author_work_count=0, author_bio="NaN", author_image="NaN", author_country_id=0, author_books="NaN"):
    self.author_name = author_name
    self.author_birth_date = author_birth_date
    self.author_death_date = author_death_date
    self.author_top_work = author_top_work
    self.author_work_count = author_work_count
    self.author_bio = author_bio
    self.author_image = author_image
    self.author_country_id = author_country_id
    self.author_books = author_books

db.create_all()

authors_list = []
d = {}
with open('authors_to_books.txt', 'r') as file:
    for line in file:
        (key, val) = line.split(" ", 1)
        val = val.replace('[', '').replace(']','').split(",")
        val = [int(num) for num in val]  
        if key != 'None':
            d[int(key)] = val
print(d)
for i in range(1375, 4393): 
    author_request_url = 'http://localhost:5000/api/author/' + str(i)
    headers = {'Accept': 'application/vnd.api+json'}
    r = requests.get(author_request_url, headers=headers)
    data = json.loads(r.content.decode('utf-8'))
    new_author = Authors(**data['data']['attributes'])
    if i in d:
        serialized = json.dumps(d[i])
        new_author.author_books = serialized
    authors_list.append(new_author)

db.session.add_all(authors_list)
db.session.commit()
