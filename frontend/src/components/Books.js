import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Books() {
    return(
      <div class="Books">
          <Container>
              <h1>Books!</h1>

              <h3>Number of books: {models_json.books.length}</h3>

              <Row>
                  <Col>Book Title</Col>
                  <Col>Book Author</Col>
              </Row>
              
              {models_json.books.map((book, index) => {
                  return(
                      <Row>
                          <Col>
                              <Link to={`/books/${index}`}>{book.title}</Link>
                          </Col>
                          <Col>
                              <Link to={`/authors/${book.authorId}`}>{book.author}</Link>
                          </Col>
                      </Row>
                  )
              })}
          </Container>
          <Outlet />
      </div>
    )
}

export function Book() {
    let params = useParams();
    let book = getBook(parseInt(params.bookId, 10));
    return (
        <>
            <h1>Book: {book.title}</h1>

            <h3>Author: <Link to={`/authors/${book.authorId}`}>{book.author}</Link></h3>

            <h3>Author Nationality: <Link to={`/countries/${models_json.authors[book.authorId].nationalityId}`}>{models_json.countries[models_json.authors[book.authorId].nationalityId].name}</Link></h3>

            <h6>
              <Row>
                    <Col>Genre: {book.genre}</Col>
                    <Col>Language: {book.language}</Col>
                    <Col>Date Published: {book.date}</Col>
              </Row>
            </h6>

            <h3>Synopsis:</h3>

            <p>{book.synopsis}</p>

            <img src={book.image} alt={book.title} />
        </>
    )
}

export function getBook(bookId) {
    return models_json.books[bookId];
}