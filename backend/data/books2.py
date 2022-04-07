from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
import credentials
import requests

# TODO Fill up the books data depending on authors in db
# TODO Add cross-model data to db
# Books to authors
# Books to countries
# Authors to books
# Authors to countries
# Countries to authors
# Countries to books

app = Flask(__name__)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Schema: "postgres+psycopg2://<USERNAME>:<PASSWORD>@<IP_ADDRESS>:<PORT>/<DATABASE_NAME>"
app.config["SQLALCHEMY_DATABASE_URI"] = credentials.db_login
db = SQLAlchemy(app)

# Define Book table/data model
class Books2(db.Model):
    # book_id = db.Column(db.String())
    book_id = db.Column(db.Integer, primary_key=True)
    book_title = db.Column(db.String())
    book_author = db.Column(db.String())
    book_author_id = db.Column(db.Integer)
    book_published = db.Column(db.String())
    book_pages = db.Column(db.Integer)
    book_maturity = db.Column(db.String())
    book_language = db.Column(db.String())
    book_categories = db.Column(db.String())
    book_description = db.Column(db.String())
    book_image = db.Column(db.String())
    book_country_id = db.Column(db.Integer)


def __init__(
    self,
    book_title="NaN",
    book_author="NaN",
    book_author_id=0,
    book_published="NaN",
    book_pages=0,
    book_maturity="NaN",
    book_language="NaN",
    book_categories="NaN",
    book_description="NaN",
    book_image="NaN",
    book_country_id=0,
):
    # self.book_id = book_id
    self.book_title = book_title
    self.book_author = book_author
    self.book_author_id = book_author_id
    self.book_published = book_published
    self.book_pages = book_pages
    self.book_maturity = book_maturity
    self.book_language = book_language
    self.book_categories = book_categories
    self.book_description = book_description
    self.book_image = book_image
    self.book_country_id = book_country_id


db.create_all()

authors_to_books = {}
book_list = []
with open('authors_to_books.txt', 'r') as file:
    for line in file:
        (key, val) = line.split(" ", 1)
        val = val.replace('[', '').replace(']','').split(",")
        val = [int(num) for num in val]  
        if key != 'None':
            authors_to_books[int(key)] = val

# 18300-18400
for i in range(18300, 18400):
    book_request_url = "http://localhost:5000/book/" + str(i)
    headers = {"Accept": "application/vnd.api+json"}
    br = requests.get(book_request_url, headers=headers)
    bdata = json.loads(br.content.decode("utf-8"))
    # author_request_url = "http://localhost:5000/author/" + str(
    #     bdata["data"]["attributes"]["book_author_id"]
    # )
    # ar = requests.get(author_request_url, headers=headers)
    # adata = json.loads(ar.content.decode("utf-8"))
    new_book = Books2(
        **bdata["data"]["attributes"]
    )
    if new_book.book_author_id not in authors_to_books:
        authors_to_books[new_book.book_author_id] = []
    authors_to_books[new_book.book_author_id].append(new_book.book_id) 
    # new_book.book_country_id = book_country_id=adata["data"]["attributes"]["author_country_id"]
    # book_list.append(new_book)
    # if len(book_list) % 100 == 0:
    #     db.session.add_all(book_list)
    #     db.session.commit()
    if i % 100 == 0:
        with open("authors_to_books.txt", "w") as file:
          for key in authors_to_books:
              print(key, authors_to_books[key], file=file)

with open("authors_to_books.txt", "w") as file:
    for key in authors_to_books:
        print(key, authors_to_books[key], file=file)
    

# db.session.add_all(book_list)
# db.session.commit()
