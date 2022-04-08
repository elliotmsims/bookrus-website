from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import data.credentials

app = Flask(__name__)
CORS(app)
app.debug = True
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = data.credentials.db_login
db = SQLAlchemy(app)

# Define Book table/data model
class Book(db.Model):
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
    country_authors = db.Column(db.String())
    country_description = db.Column(db.String())
    country_languages = db.Column(db.String())
    country_population = db.Column(db.Integer)


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
    author_books = db.Column(db.String())
    author_genre = db.Column(db.String())
    author_nationality = db.Column(db.String())