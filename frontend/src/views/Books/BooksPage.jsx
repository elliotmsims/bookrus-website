import {
  Container,
  // Row,
  // Card,
  // ListGroup,
  // Button,
  // ListGroupItem,
} from "react-bootstrap";
// import { Outlet, Link } from "react-router-dom";
import getBooks from "../../api/getBooks";

export default function Books() {
  const books = getBooks();
  console.log(books);
  return (
    <div className="Books">
      <Container>
        <h1>Books!</h1>
        <h3>Number of books: 0</h3>
        {/* <Row xs={1} md={4}>
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
        </Row> */}
      </Container>
    </div>
  );
}
