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
def get_countries(search=None, page=1):
    # sort will contain a string with the attribute to be sorted by
    name = request.args.get("country_name")
    region = request.args.get("country_region")
    capital = request.args.get("country_capital_city")
    description = request.args.get("country_description")
    languages = request.args.get("country_languages")
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Country)
    if search is None:
        if name is not None:
            name = "%" + name + "%"
            query = query.filter(Country.country_name.like(name))
        if region is not None:
            region = "%" + region + "%"
            query = query.filter(Country.country_region.like(region))
        if capital is not None:
            capital = "%" + capital + "%"
            query = query.filter(Country.country_capital_city.like(capital))
        if description is not None:
            description = "%" + description + "%"
            query = query.filter(Country.country_description.like(description))
        if languages is not None:
            description = "%" + languages + "%"
            query = query.filter(Country.country_languages.like(languages))
    else:
        terms = search.split()
        for search in terms:
            search = "%" + search + "%"
            query = query.filter(or_(Country.country_name.like(search),
            Country.country_region.like(search),
            Country.country_capital_city.like(search),
            Country.country_description.like(search),
            Country.country_languages.like(search),
            Country.country_demonym.like(search)))
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
def get_books(search=None, page=1):
    # sort will contain a string with the attribute to be sorted by
    title = request.args.get("book_title")
    author = request.args.get("book_author")
    pages = request.args.get("book_pages")
    maturity = request.args.get("book_maturity")
    description = request.args.get("book_description")
    category = request.args.get("book_category")
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Book)
    # Sort only if attribute exists as a column name
    if search is None:
        if title is not None:
            title = "%" + title + "%"
            query = query.filter(Book.book_title.like(title))
        if author is not None:
            author = "%" + author + "%"
            query = query.filter(Book.book_author.like(author))
        if category is not None:
            category = "%" + category + "%"
            query = query.filter(Book.book_categories.like(category))
        if pages is not None:
            query = query.filter(Book.book_pages==pages)
        if description is not None:
            description = "%" + description + "%"
            query = query.filter(Book.book_description.like(description))
        if maturity is not None:
            description = "%" + maturity + "%"
            query = query.filter(Book.book_maturity.like(maturity))
    else:
        terms = search.split()
        for search in terms:
            search = "%" + search + "%"
            query = query.filter(or_(Book.book_title.like(search),
            Book.book_author.like(search),
            Book.book_categories.like(search),
            Book.book_published.like(search),
            Book.book_language.like(search),
            Book.book_maturity.like(search),
            Book.book_description.like(search)))
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

@app.route("/authors/<int:id>")
def get_author(id):
    query = db.session.query(Author).filter_by(author_id=id)
    result = author_schema.dump(query, many=True)[0]
    return jsonify(result)

@app.route("/authors")
def get_authors(search=None, page=1):
    name = request.args.get("author_name")
    nationality = request.args.get("author_nationality")
    genre = request.args.get("author_genre")
    work_count = request.args.get("author_work_count")
    bio = request.args.get("author_bio")
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Author)
    if search is None:
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
    else:
        terms = search.split()
        for search in terms:
            search = "%" + search + "%"
            query = query.filter(or_(Author.author_name.like(search),
            Author.author_birth_date.like(search),
            Author.author_death_date.like(search),
            Author.author_top_work.like(search),
            Author.author_bio.like(search),
            Author.author_nationality.like(search),
            Author.author_genre.like(search)))
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

@app.route("/search")
def get_search():
    search = request.args.get("search")
    author_result = json.loads(get_authors(search).data)
    country_result = json.loads(get_countries(search).data)
    books_result = json.loads(get_books(search).data)
    return jsonify(
        {
            "data": [author_result['data'], country_result['data'], books_result['data']],
            "meta_total": author_result['meta_total'] + country_result['meta_total'] + books_result['meta_total']
        }
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

