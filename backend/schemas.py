from flask_marshmallow import Marshmallow
from models import Author, Country, Book
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field

ma = Marshmallow()

class CountrySchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Country
        ordered = True

    country_id = auto_field()
    country_name = auto_field()
    country_region = auto_field()
    country_capital_city = auto_field()
    country_lat = auto_field()
    country_long = auto_field()
    country_demonym = auto_field()
    country_image = auto_field()
    country_authors = auto_field()
    country_description = auto_field()
    country_languages = auto_field()
    country_population = auto_field()

class BookSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        ordered = True

    book_id = auto_field()
    book_title = auto_field()
    book_author = auto_field()
    book_author_id = auto_field()
    book_published = auto_field()
    book_pages = auto_field()
    book_maturity = auto_field()
    book_language = auto_field()
    book_categories = auto_field()
    book_description = auto_field()
    book_image = auto_field()
    book_country_id = auto_field()

class AuthorSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Author
        ordered = True

    author_id = auto_field()
    author_name = auto_field()
    author_birth_date = auto_field()
    author_death_date = auto_field()
    author_top_work = auto_field()
    author_work_count = auto_field()
    author_bio = auto_field()
    author_image = auto_field()
    author_country_id = auto_field()
    author_books = auto_field()
    author_genre = auto_field()
    author_nationality = auto_field()

country_schema = CountrySchema()
author_schema = AuthorSchema()
book_schema = BookSchema()
