from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, Column, String, Integer
import urllib
import json
import credentials
import requests

#TODO Fill up the books data depending on authors in db
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

# Define Book table/data model
class Book(db.Model):
    # book_id = db.Column(db.String())
    book_id = db.Column(db.Integer, primary_key=True)
    book_title = db.Column(db.String())
    book_author = db.Column(db.String())
    book_author_id = db.Column(db.String())
    book_published = db.Column(db.String())
    book_pages = db.Column(db.Integer)
    book_maturity = db.Column(db.String())
    book_language = db.Column(db.String())
    book_categories = db.Column(db.String())
    book_description = db.Column(db.String())
    book_image = db.Column(db.String())

def __init__(self, book_title="NaN", book_author="NaN", book_published="NaN", book_pages=0, book_maturity="NaN", book_language="NaN", book_categories="NaN", book_description="NaN", book_image="NaN"):
    # self.book_id = book_id
    self.book_title = book_title
    self.book_author = book_author
    self.book_published = book_published
    self.book_pages = book_pages
    self.book_maturity = book_maturity
    self.book_language = book_language
    self.book_categories = book_categories
    self.book_description = book_description
    self.book_image = book_image

db.create_all()

# Get API request
book_list = []
for i in range(643, 4393):
  author_request_url = 'http://localhost:5000/api/author/' + str(i)
  headers = {'Accept': 'application/vnd.api+json'}
  ar = requests.get(author_request_url, headers=headers)
  adata = json.loads(ar.content.decode('utf-8'))
  author = urllib.parse.quote(adata['data']['attributes']['author_name'], safe='')
  book_request_url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + author + '&key=AIzaSyBfeqs1GhZbXfzKvPihZxYJz3y4h--W5ZM'
  br = urllib.request.urlopen(book_request_url)
  bdata = json.loads(br.read())
  
  for item in bdata["items"]:
      if "authors" not in item['volumeInfo'] or "title" not in item['volumeInfo']:
          continue
      new_book = Book(book_title=item["volumeInfo"]["title"], book_author=item['volumeInfo']["authors"][0], book_author_id=i)
      if "publishedDate" in item['volumeInfo']:
          new_book.book_published=item['volumeInfo']["publishedDate"] 
      if "pageCount" in item['volumeInfo']:
          new_book.book_pages=item['volumeInfo']["pageCount"]
      if "maturityRating" in item['volumeInfo']:
          new_book.book_maturity=item['volumeInfo']["maturityRating"]
      if "language" in item['volumeInfo']:
          new_book.book_language=item['volumeInfo']["language"]
      if "categories" in item['volumeInfo']:
          new_book.book_categories=item['volumeInfo']["categories"][0]
      if "description" in item['volumeInfo']:
          new_book.book_description=item['volumeInfo']["description"]
      if "imageLinks" in item['volumeInfo'] and 'thumbnail' in item['volumeInfo']['imageLinks']:
          new_book.book_image=item['volumeInfo']["imageLinks"]['thumbnail']
      book_list.append(new_book)
  if len(book_list) % 100 == 0:
      print('Appending db...')
      db.session.add_all(book_list)
      db.session.commit()

db.session.add_all(book_list)
db.session.commit()