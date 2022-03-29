from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
import credentials
# from data.countries import Country
# from data.books import Book
# from data.authors import Author

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = credentials.db_login
db = SQLAlchemy(app)

# Define Book table/data model
class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    book_title = db.Column(db.String())
    book_author = db.Column(db.String())
    book_published = db.Column(db.String())
    book_pages = db.Column(db.Integer)
    book_maturity = db.Column(db.String())
    book_language = db.Column(db.String())
    book_categories = db.Column(db.String())
    book_description = db.Column(db.String())

# Define Country table/data model
class Country(db.Model):
    country_id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String())
    country_region = db.Column(db.String())
    country_capital_city = db.Column(db.String())
    country_lat = db.Column(db.Float)
    country_long = db.Column(db.Float)

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

# Build database
db.create_all()

# Method to add CORS headers to all api sessions
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

# Define database API system here, accessible at /api/[modelname]/[number]
methods = ['GET']

manager = APIManager(app, session=db.session)
book_blueprint = manager.create_api_blueprint('book', Book, methods=methods, url_prefix='/')
country_blueprint = manager.create_api_blueprint('country', Country, methods=methods, url_prefix='/')
author_blueprint = manager.create_api_blueprint('author', Author, methods=methods, url_prefix='/')
blueprints = (book_blueprint, country_blueprint, author_blueprint)
for blueprint in blueprints:
    blueprint.after_request(add_cors_headers)
    app.register_blueprint(blueprint)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)