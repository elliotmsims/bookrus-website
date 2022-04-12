from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from flask import jsonify, request

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

@app.route("/countries")
def get_countries():
    # sort will contain a string with the attribute to be sorted by
    sort = request.args.get("sort")
    query = db.session.query(Country)
    # Sort only if attribute exists as a column name
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Country, sort, None) is not None:
            query = query.order_by(getattr(Country, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=10, error_out=False).items
    result = country_schema.dump(end_query, many=True)
    return jsonify(
        {
            "data": result,
            "meta_total": count
        }
    )

@app.route("/countries/<int:id>")
def get_country(id):
    query = db.session.query(Country).filter_by(country_id=id)
    result = country_schema.dump(query, many=True)[0]
    return jsonify(result)

@app.route("/books")
def get_books():
    # sort will contain a string with the attribute to be sorted by
    sort = request.args.get("sort")
    query = db.session.query(Book)
    # Sort only if attribute exists as a column name
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Book, sort, None) is not None:
            query = query.order_by(getattr(Book, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=10, error_out=False).items
    result = book_schema.dump(end_query, many=True)
    return jsonify(
        {
            "data": result,
            "meta_total": count
        }
    )

@app.route("/books/<int:id>")
def get_book(id):
    query = db.session.query(Book).filter_by(book_id=id)
    result = book_schema.dump(query, many=True)[0]
    return jsonify(result)


@app.route("/authors")
def get_authors():
    # sort will contain a string with the attribute to be sorted by
    sort = request.args.get("sort")
    query = db.session.query(Author)
    # Sort only if attribute exists as a column name
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Author, sort, None) is not None:
            query = query.order_by(getattr(Author, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=10, error_out=False).items
    result = author_schema.dump(end_query, many=True)
    return jsonify(
        {
            "data": result,
            "meta_total": count
        }
    )

@app.route("/authors/<int:id>")
def get_author_filter(id):
    query = db.session.query(Author).filter_by(author_id=id)
    result = author_schema.dump(query, many=True)[0]
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
