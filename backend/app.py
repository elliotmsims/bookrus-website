from models import app, db, Country, Author, Book
from schemas import country_schema, author_schema, book_schema
from sqlalchemy import or_
from flask import jsonify, request, json
import json

# Build database
db.create_all()

@app.route("/")
def hello_world():
    return '<img src="https://i.kym-cdn.com/photos/images/original/001/211/814/a1c.jpg" alt="cowboy" />'

@app.route("/countries")
def get_countries(search=None):
    # name, region, population, lat, long
    limit = request.args.get("limit")
    if limit is not None: limit = int(limit)
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Country)
    if search is not None:
        query = query.filter(or_(Country.country_name.ilike('%' + search + '%'),
        Country.country_region.ilike('%' + search + '%')))
        try:
            query = query.filter(or_(Country.country_population.ilike(int(search))))
        except:
            pass
        try:
            query = query.filter(or_(Country.country_lat.ilike(float(search))))
            query = query.filter(or_(Country.country_long.ilike(float(search))))
        except:
            pass
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
def get_books(search=None):
    # Searchable: Title, Author, publication, language, genre, page count
    limit = request.args.get("limit")
    if limit is not None: limit = int(limit)
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Book)
    if search is not None:
        query = query.filter(or_(Book.book_title.ilike('%' + search + '%'),
        Book.book_author.ilike('%' + search + '%'),
        Book.book_published.ilike('%' + search + '%'),
        Book.book_language.ilike('%' + search + '%'),
        Book.book_categories.ilike('%' + search + '%')))
        try:
            query = query.filter(or_(Book.book_pages.ilike(int(search))))
        except:
            pass
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
def get_authors(search=None):
    # Name, Best work, work count, genre, nationality
    limit = request.args.get("limit")
    if limit is not None: limit = int(limit)
    sort = request.args.get("sort")
    search = request.args.get("search")
    query = db.session.query(Author)
    if search is not None:
        query = query.filter(or_(Author.author_name.ilike('%' + search + '%'),
        Author.author_top_work.ilike('%' + search + '%'),
        Author.author_genre.ilike('%' + search + '%'),
        Author.author_nationality.ilike('%' + search + '%')))
        try:
            query = query.filter(or_(Author.author_work_count.ilike(int(search))))
        except:
            pass                
            
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
    print(type(result))
    print(result)
    return jsonify(result)

@app.route("/search")
def get_search():
    search = request.args.get("search")
    page = request.args.get("page", type=int)
    limit = request.args.get("limit")
    if limit is not None: limit = int(limit)
    qa, qb, qc = db.session.query(Author), db.session.query(Book), db.session.query(Country)

    # Author Query
    if search is not None:
        qa = qa.filter(or_(Author.author_name.ilike('%' + search + '%'),
        Author.author_top_work.ilike('%' + search + '%'),
        Author.author_genre.ilike('%' + search + '%'),
        Author.author_nationality.ilike('%' + search + '%')))
        try:
            qa = qa.filter(or_(Author.author_work_count.ilike(int(search))))
        except:
            pass  

    # Book Query
    if search is not None:
        qb = qb.filter(or_(Book.book_title.ilike('%' + search + '%'),
        Book.book_author.ilike('%' + search + '%'),
        Book.book_published.ilike('%' + search + '%'),
        Book.book_language.ilike('%' + search + '%'),
        Book.book_categories.ilike('%' + search + '%')))
        try:
            qb = qb.filter(or_(Book.book_pages.ilike(int(search))))
        except:
            pass

    # Country Query
    if search is not None:
        qc = qc.filter(or_(Country.country_name.ilike('%' + search + '%'),
        Country.country_region.ilike('%' + search + '%')))
        try:
            qc = qc.filter(or_(Country.country_population.ilike(int(search))))
        except:
            pass
        try:
            qc = qc.filter(or_(Country.country_lat.ilike(float(search))))
            qc = qc.filter(or_(Country.country_long.ilike(float(search))))
        except:
            pass
    
    query = db.session.query(qa.subquery(), qb.subquery(), qc.subquery())
    count = query.count()
    end_query = query.paginate(page=page, per_page=limit, error_out=False).items
    result_a = author_schema.dump(end_query, many=True)
    result_b = book_schema.dump(end_query, many=True)
    result_c = country_schema.dump(end_query, many=True)
    return jsonify(
        {
            "data": [*result_a, *result_b, *result_c],
            "meta_total": count
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

