import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Books() {
    return(
      <div class="Books">
          <Container>
              <h1>Books!</h1>

              <h3>Number of books: {models_json.books.length}</h3>
              
              {models_json.books.map((book, index) => {
                  return(
                      <Row>
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={book.image} />
                            <Card.Body>
                              <Card.Title>{book.title}</Card.Title>
                              <Card.Text>
                              <ListGroup>
                                <ListGroupItem>Author: <Link to={`/authors/${book.authorId}`}>{book.author}</Link></ListGroupItem>
                                <ListGroupItem>Genre: {book.genre}</ListGroupItem>
                                <ListGroupItem>Pages: {book.length}</ListGroupItem>
                              </ListGroup>
                              </Card.Text>
                              <Link to={`/books/${index}`}>
                                <Button variant="primary">Learn about {book.title}</Button>
                              </Link>
                            </Card.Body>
                          </Card>
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
                    <Col>Pages: {book.length}</Col>
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