from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from sqlalchemy import or_
from flask import jsonify, request, json

# Build database
db.create_all()

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/countries")
def get_countries(search=None, search_all=False):
    # name, region, population, lat, long
    limit = int(request.args.get("limit"))
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Country)
    if search is not None:
        query = query.filter(Country.country_name.ilike('%' + search + '%'))
        if search_all is True:
            query = query.filter(or_(Country.country_name.like(search),
            Country.country_region.like(search),
            Country.country_population.like(search),
            Country.country_lat.like(search),
            Country.country_long.like(search)))
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Country, sort, None) is not None:
            query = query.order_by(getattr(Country, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=limit, error_out=False).items
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
def get_books(search=None, search_all=False):
    # Searchable: Title, Author, publication, language, genre, page count
    limit = int(request.args.get("limit"))
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Book)
    if search is not None:
        query = query.filter(Book.book_title.ilike('%' + search + '%'))
        if search_all is True:
            query = query.filter(or_(Book.book_title.like(search),
            Book.book_author.like(search),
            Book.book_published.like(search),
            Book.book_language.like(search),
            Book.book_categories.like(search),
            Book.book_pages.like(search)))
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Book, sort, None) is not None:
            query = query.order_by(getattr(Book, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=limit, error_out=False).items
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
def get_authors(search=None, search_all=False):
    # Name, Best work, work count, genre, nationality
    limit = int(request.args.get("limit"))
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Author)
    if search is not None:
        query = query.filter(Author.author_name.ilike('%' + search + '%'))
        if search_all is True:
            query = query.filter(or_(Author.author_name.like(search),
            Author.author_top_work.like(search),
            Author.author_work_count.like(search),
            Author.author_genre.like(search),
            Author.author_nationality.like(search)))
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Author, sort, None) is not None:
            query = query.order_by(getattr(Author, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    end_query = query.paginate(page=page, per_page=limit, error_out=False).items
    result = author_schema.dump(end_query, many=True)
    return jsonify(
        {
            "data": result,
            "meta_total": count
        }
    )

@app.route("/authors/<int:id>")
def get_author(id):
    query = db.session.query(Author).filter_by(author_id=id)
    result = author_schema.dump(query, many=True)[0]
    return jsonify(result)

@app.route("/search")
def get_search():
    search = request.args.get("search")
    author_result = json.loads(get_authors(search, True).data)
    country_result = json.loads(get_countries(search, True).data)
    books_result = json.loads(get_books(search, True).data)
    return jsonify(
        {
            "data": [author_result['data'], country_result['data'], books_result['data']],
            "meta_total": author_result['meta_total'] + country_result['meta_total'] + books_result['meta_total']
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

