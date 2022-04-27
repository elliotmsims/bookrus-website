from calendar import c
from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from sqlalchemy import or_, and_
from flask import jsonify, request

# Build database
db.create_all()

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/countries")
def get_countries():
    # GET ARGS
    # pagination
    page = request.args.get("page", type=int)
    limit = request.args.get("limit", type=int)
    # sort/search
    sort = request.args.get("sort")
    search = request.args.get("search")
    # filters (for data visualizations)
    region = request.args.get("region") # use "and" for "&"; might have to add extra " " at end
    population = request.args.get("population") # "a-b" format = [a, b]

    # START QUERY
    query = db.session.query(Country)
    # query2 = db.session.query(Book.book_language).distinct()
    # for value in query2:
    #         print(value)

    # SEARCHING
    if search is not None:
        search = search.split(" ")
        cols = []
        for term in search:
            cols.append(Country.country_name.ilike('%' + term + '%'))
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

    # SORTING
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Country, sort, None) is not None:
            query = query.order_by(getattr(Country, sort))

    # FILTERING
    if region is not None:
        region = region.replace("and", "&")
        query = query.filter(Country.country_region.ilike(region))
    if population is not None:
        range = population.split("-")
        try:
             query = query.filter(and_(int(range[0]) <= Country.country_population), (Country.country_population <= int(range[1])))
        except:
            pass

    count = query.count()
    # if no page is given, all data results returned
    if page is not None:
        query = query.paginate(page=page, per_page=limit, error_out=False).items
    result = country_schema.dump(query, many=True)
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
    # GET ARGS
    # pagination
    page = request.args.get("page", type=int)
    limit = request.args.get("limit", type=int)
    # sort/search
    sort = request.args.get("sort")
    search = request.args.get("search")
    # filters (for data visualizations)
    language = request.args.get("language")
    genre = request.args.get("genre") # too many genres
    length = request.args.get("length") # "a-b" = [a, b]
    maturity = request.args.get("maturity") # "not mature" or "mature"

    # START QUERY
    query = db.session.query(Book)

    # SEARCHING
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

    # SORTING
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Book, sort, None) is not None:
            query = query.order_by(getattr(Book, sort))

    # FILTERING
    if language is not None:
        query = query.filter(Book.book_language.ilike(language))
    if genre is not None:
        query = query.filter(Book.book_categories.ilike(genre))
    if length is not None:
        range = length.split("-")
        try:
             query = query.filter(and_(int(range[0]) <= Book.book_pages), (Book.book_pages <= int(range[1])))
        except:
            pass
    if maturity is not None:
        maturity = maturity.replace(" ", "_")
        query = query.filter(Book.book_maturity.ilike(maturity))

    count = query.count()
    # if no page is given, all data results returned
    if page is not None:
        query = query.paginate(page=page, per_page=limit, error_out=False).items
    result = book_schema.dump(query, many=True)
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
     # GET ARGS
    # pagination
    page = request.args.get("page", type=int)
    limit = request.args.get("limit", type=int)
    # sort/search
    sort = request.args.get("sort")
    search = request.args.get("search")
    # filters (for data visualizations)
    work_count = request.args.get("work-count") # "a-b" = [a, b]
    main_genre = request.args.get("main-genre") # too many genres
    nationality = request.args.get("nationality")

    # START QUERY
    query = db.session.query(Author)

    # SEARCHING
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
    
    # SORTING
    if sort is not None:
        sort = sort.replace("-", "_")
        if getattr(Author, sort, None) is not None:
            query = query.order_by(getattr(Author, sort))

    # FILTERING
    if work_count is not None:
        range = work_count.split("-")
        try:
             query = query.filter(and_(int(range[0]) <= Author.author_work_count), (Author.author_work_count <= int(range[1])))
        except:
            pass
    if main_genre is not None:
        query = query.filter(Author.author_genre.ilike(main_genre))
    if nationality is not None:
        query = query.filter(Author.author_nationality.ilike(nationality))

    count = query.count()
    # if no page is given, all data results returned
    if page is not None:
        query = query.paginate(page=page, per_page=limit, error_out=False).items
    result = author_schema.dump(query, many=True)
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

