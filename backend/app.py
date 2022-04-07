from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from flask import jsonify
from flask_restless import APIManager

# Build database
db.create_all()

# # Method to add CORS headers to all api sessions
# def add_cors_headers(response):
#     response.headers["Access-Control-Allow-Origin"] = "*"
#     return response

# # Define database API system here, accessible at /api/[modelname]/[number]
# methods = ["GET"]

# manager = APIManager(app, session=db.session)
# book_blueprint = manager.create_api_blueprint(
#     "book", Book, methods=methods, url_prefix="/"
# )
# country_blueprint = manager.create_api_blueprint(
#     "country", Country, methods=methods, url_prefix="/"
# )
# author_blueprint = manager.create_api_blueprint(
#     "author", Author, methods=methods, url_prefix="/"
# )
# blueprints = (book_blueprint, country_blueprint, author_blueprint)
# for blueprint in blueprints:
#     blueprint.after_request(add_cors_headers)
#     app.register_blueprint(blueprint)

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/cowboy")
def hello_world2():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/country")
def get_countries():
    query = db.session.query(Country)
    result = country_schema.dump(query, many=True)

    return jsonify(
        {
            "countries": result
        }
    )

@app.route("/country/<int:id>")
def get_country(id):
    query = db.session.query(Country).filter_by(country_id=id)
    result = country_schema.dump(query, many=True)[0]
    return jsonify(result)

@app.route("/book")
def get_books():
    query = db.session.query(Book)
    result = book_schema.dump(query, many=True)

    return jsonify(
        {
            "books": result
        }
    )

@app.route("/book/<int:id>")
def get_book(id):
    query = db.session.query(Book).filter_by(book_id=id)
    result = book_schema.dump(query, many=True)[0]
    return jsonify(result)


@app.route("/author")
def get_authors():
    query = db.session.query(Author)
    result = author_schema.dump(query, many=True)

    return jsonify(
        {
            "authors": result
        }
    )

@app.route("/author/<int:id>")
def get_author(id):
    query = db.session.query(Author).filter_by(author_id=id)
    result = author_schema.dump(query, many=True)[0]
    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
