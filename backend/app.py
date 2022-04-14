from calendar import c
from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from sqlalchemy import or_
from flask import jsonify, request

# Build database
db.create_all()

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/countries")
def get_countries(search=None, arg_page=1):
    # name, region, population, lat, long
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Country)
    if search is not None:
        cols = [
            Country.country_name.ilike('%' + str(search) + '%'),
            Country.country_region.ilike('%' + search + '%')]
        try:
            cols.append(Country.country_population == int(search))
        except:
            pass
        try:
            cols.append(Country.country_lat == float(search))
            cols.append(Country.country_long == float(search))
        except:
            pass
        query = query.filter(or_(*cols))
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Country, sort, None) is not None:
            query = query.order_by(getattr(Country, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = arg_page
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
def get_books(search=None, arg_page=1):
    # Searchable: Title, Author, publication, language, genre, page count
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Book)
    if search is not None:
        cols = [
            Book.book_title.ilike('%' + search + '%'),
            Book.book_author.ilike('%' + search + '%'),
            Book.book_published.ilike('%' + search + '%'),
            Book.book_language.ilike('%' + search + '%'),
            Book.book_categories.ilike('%' + search + '%')]
        try:
            cols.append(Book.book_pages == int(search))
        except:
            pass
        query = query.filter(or_(*cols)) 
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Book, sort, None) is not None:
            query = query.order_by(getattr(Book, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = arg_page
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
def get_authors(search=None, arg_page=1):
    # Name, Best work, work count, genre, nationality
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Author)
    if search is not None:
        cols = [
            Author.author_name.ilike('%' + search + '%'),
            Author.author_top_work.ilike('%' + search + '%'),
            Author.author_genre.ilike('%' + search + '%'),
            Author.author_nationality.ilike('%' + search + '%')]
        try:
            cols.append(Author.author_work_count == int(search))
        except:
            pass                
        query = query.filter(or_(*cols))
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Author, sort, None) is not None:
            query = query.order_by(getattr(Author, sort))
    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = arg_page
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
    author_page = request.args.get("authorpage", type=int)
    country_page = request.args.get("countrypage", type=int)
    book_page = request.args.get("bookpage", type=int)
    author_result = get_authors(search, author_page).get_json()
    country_result = get_countries(search, country_page).get_json()
    book_result = get_books(search, book_page).get_json()
    return jsonify(
        {
            "authors": author_result,
            "countries": country_result,
            "books": book_result,
            "meta_total": author_result["meta_total"] + country_result["meta_total"] + book_result["meta_total"]
        }
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

