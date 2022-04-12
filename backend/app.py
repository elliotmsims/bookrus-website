from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from flask import jsonify, request

# Build database
db.create_all()

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


# @app.route("/authors")
# def get_authors():
#     # sort will contain a string with the attribute to be sorted by
#     sort = request.args.get("sort")
#     query = db.session.query(Author)
#     # Sort only if attribute exists as a column name
#     if sort is not None:
#         sort = sort.replace("-", "_")
#         if getattr(Author, sort, None) is not None:
#             query = query.order_by(getattr(Author, sort))
#     count = query.count()
#     page = request.args.get("page", type=int)
#     end_query = query.paginate(page=page, per_page=10, error_out=False).items
#     result = author_schema.dump(end_query, many=True)
#     return jsonify(
#         {
#             "data": result,
#             "meta_total": count
#         }
#     )

@app.route("/authors/<int:id>")
def get_author(id):
    query = db.session.query(Author).filter_by(author_id=id)
    result = author_schema.dump(query, many=True)[0]
    return jsonify(result)

@app.route("/authors")
def get_authors():
    name = request.args.get("author_name")
    nationality = request.args.get("author_nationality")
    genre = request.args.get("author_genre")
    work_count = request.args.get("author_work_count")
    bio = request.args.get("author_bio")
    sort = request.args.get("sort")
    query = db.session.query(Author)
    if name is not None:
        name = "%" + name + "%"
        query = query.filter(Author.author_name.like(name))
    if nationality is not None:
        nationality = "%" + nationality + "%"
        query = query.filter(Author.author_nationality.like(nationality))
    if genre is not None:
        genre = "%" + genre + "%"
        query = query.filter(Author.author_genre.like(genre))
    if work_count is not None:
        query = query.filter(Author.author_work_count==work_count)
    if bio is not None:
        bio = "%" + bio + "%"
        query = query.filter(Author.author_bio.like(bio))
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

