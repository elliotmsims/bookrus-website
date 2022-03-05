import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { useParams, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModelsJson } from "./Models";

export function Books() {
  return (
    <div className="Books">
      <Container>
        <h1>Books!</h1>

        <h3>Number of books: {ModelsJson.books.length}</h3>
        <Row xs={1} md={4}>
          {ModelsJson.books.map((book, index) => (
            <Row>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <ListGroup>
                      <ListGroupItem>
                        Author:{" "}
                        <Link to={`/authors/${book.authorId}`}>
                          {book.author}
                        </Link>
                      </ListGroupItem>
                      <ListGroupItem>Genre: {book.genre}</ListGroupItem>
                      <ListGroupItem>Pages: {book.length}</ListGroupItem>
                      <ListGroupItem>Language: {book.language}</ListGroupItem>
                    </ListGroup>
                  </Card.Text>
                  <Link to={`/books/${index}`}>
                    <Button variant="primary">Learn about {book.title}</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </Row>
      </Container>
      <Outlet />
    </div>
  );
}

export function getBook(bookId) {
  return ModelsJson.books[bookId];
}

export function Book() {
  const params = useParams();
  const book = getBook(parseInt(params.bookId, 10));
  return (
    <>
      <h1>Book: {book.title}</h1>

      <h3>
        Author: <Link to={`/authors/${book.authorId}`}>{book.author}</Link>
      </h3>

      <h3>
        Author Nationality:{" "}
        <Link
          to={`/countries/${ModelsJson.authors[book.authorId].nationalityId}`}
        >
          {
            ModelsJson.countries[
              ModelsJson.authors[book.authorId].nationalityId
            ].name
          }
        </Link>
      </h3>

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
  );
}
