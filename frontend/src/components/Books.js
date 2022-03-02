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
                          <Col>{book.author}</Col>
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

            <h3>Author: {book.author}</h3>

            <h3>Synopsis:</h3>

            <p>{book.synopsis}</p>

            <img src={book.image} alt={book.title} />
        </>
    )
}

export function getBook(bookId) {
    return models_json.books[bookId];
}