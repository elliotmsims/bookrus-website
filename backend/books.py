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
class Book(db.Model):
    book_id = db.Column(db.String(), primary_key=True)
    book_title = db.Column(db.String())
    book_author = db.Column(db.String())
    book_published = db.Column(db.String())
    book_pages = db.Column(db.Integer)
    book_maturity = db.Column(db.String())
    book_language = db.Column(db.String())
    book_categories = db.Column(db.String())
    book_description = db.Column(db.String())

def __init__(self, book_id="NaN", book_title="NaN", book_author="NaN", book_published="NaN", book_pages=0, book_maturity="NaN", book_language="NaN", book_categories="NaN", book_description="NaN"):
    self.book_id = book_id
    self.book_title = book_title
    self.book_author = book_author
    self.book_published = book_published
    self.book_pages = book_pages
    self.book_maturity = book_maturity
    self.book_language = book_language
    self.book_categories = book_categories
    self.book_description = book_description

db.create_all()

# Get API request
request_url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:Shakespeare&key=AIzaSyBfeqs1GhZbXfzKvPihZxYJz3y4h--W5ZM'
r = urllib.request.urlopen(request_url)
data = json.loads(r.read())

book_list = []
for item in data["items"]:
    # Account for case where there is no latitude or longitude
    if item['volumeInfo']["description"] != None and item['volumeInfo']["categories"] != None:
        new_book = Book(book_id=item["id"], book_title=item["volumeInfo"]["title"], book_author=item['volumeInfo']["authors"][0], book_published=item['volumeInfo']["publishedDate"], book_pages=item['volumeInfo']["pageCount"], book_maturity=item['volumeInfo']["maturityRating"], book_language=item['volumeInfo']["language"], book_categories=item['volumeInfo']["categories"][0], book_description=item['volumeInfo']["description"])
    book_list.append(new_book)

db.session.add_all(book_list)
db.session.commit()