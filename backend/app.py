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
def get_countries():
    # name, region, population, lat, long
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    name = request.args.get("name")
    region = request.args.get("region")
    capital = request.args.get("capital")
    languages = request.args.get("languages")
    query = db.session.query(Country)

    # filtering
    if name is not None:
        name = "%" + name + "%"
        query = query.filter(Country.country_name.like(name))
    if region is not None:
        region = "%" + region + "%"
        query = query.filter(Country.country_region.like(region))
    if capital is not None:
        capital = "%" + capital + "%"
        query = query.filter(Country.country_capital_city.like(capital))
    if languages is not None:
        languages = "%" + languages + "%"
        query = query.filter(Country.country_languages.like(languages))

    # searching
    if search is not None:
        search = search.split(" ")
        cols = []
        for term in search:
            cols.append(Country.country_name.ilike('%' + str(term) + '%'))
            cols.append(Country.country_region.ilike('%' + term + '%'))
        try:
            cols.append(Country.country_population == int(term))
        except:
            pass
        try:
            cols.append(Country.country_lat == float(term))
            cols.append(Country.country_long == float(term))
        except:
            pass
        query = query.filter(or_(*cols))

    # sorting
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Country, sort, None) is not None:
            query = query.order_by(getattr(Country, sort))

    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = 1
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
def get_books():
    # Searchable: Title, Author, publication, language, genre, page count
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    title = request.args.get("title")
    author = request.args.get("author")
    pages = request.args.get("pages")
    maturity = request.args.get("maturity")
    category = request.args.get("category")
    query = db.session.query(Book)

    # filtering
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
    if maturity is not None:
        maturity = "%" + maturity + "%"
        query = query.filter(Book.book_maturity.like(maturity))

    # searching
    if search is not None:
        search = search.split(" ")
        cols = []
        for term in search:
            cols.append(Book.book_title.ilike('%' + term + '%'))
            cols.append(Book.book_author.ilike('%' + term + '%'))
            cols.append(Book.book_language.ilike('%' + term + '%'))
            cols.append(Book.book_categories.ilike('%' + term + '%'))
        try:
            cols.append(Book.book_pages == int(term))
        except:
            pass
        query = query.filter(or_(*cols)) 

    # sorting
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Book, sort, None) is not None:
            query = query.order_by(getattr(Book, sort))

    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = 1
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
def get_authors():
    # Name, Best work, work count, genre, nationality
    limit = request.args.get("limit")
    limit = int(limit) if limit is not None else 10
    sort = request.args.get("sort")
    search = request.args.get("search")
    name = request.args.get("name")
    nationality = request.args.get("nationality")
    genre = request.args.get("genre")
    works = request.args.get("works")
    query = db.session.query(Author)

    # filtering
    if name is not None:
        name = "%" + name + "%"
        query = query.filter(Author.author_name.like(name))
    if nationality is not None:
        nationality = "%" + nationality + "%"
        query = query.filter(Author.author_nationality.like(nationality))
    if genre is not None:
        genre = "%" + genre + "%"
        query = query.filter(Author.author_genre.like(genre))
    if works is not None:
        query = query.filter(Author.author_work_count==works)

    # searching
    if search is not None:
        search = search.split(" ")
        cols = []
        for term in search:
            cols.append(Author.author_name.ilike('%' + term + '%'))
            cols.append(Author.author_top_work.ilike('%' + term + '%'))
            cols.append(Author.author_genre.ilike('%' + term + '%'))
            cols.append(Author.author_nationality.ilike('%' + term + '%'))
        try:
            cols.append(Author.author_work_count == int(term))
        except:
            pass                
        query = query.filter(or_(*cols))
    
    # sorting
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Author, sort, None) is not None:
            query = query.order_by(getattr(Author, sort))

    count = query.count()
    page = request.args.get("page", type=int)
    if page is None: page = 1
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

