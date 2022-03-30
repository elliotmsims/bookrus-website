import {
  Container,
  Col,
  Row,
  Card,
  // ListGroup,
  // Button,
  // ListGroupItem,
} from "react-bootstrap";
// import { Outlet, Link } from "react-router-dom";
import getBooks from "../../api/getBooks";

export default function Books() {
  const books = getBooks();
  const arr = [];
  Object.keys(books).forEach((index) => {
    arr.push(books[index].attributes);
  });
  return (
    <div className="Books">
      <Container>
        <h1>Books!</h1>
        <h3>Number of authors: {books.length}</h3>
        <Row xs={1} md={4}>
          {arr.map((book) => (
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.book_image} />
                <Card.Body>
                  <Card.Title>{book.book_title}</Card.Title>
                  {/* <Card.Text>
                    <ListGroup>
                      <ListGroupItem>Born: {author.born}</ListGroupItem>
                      <ListGroupItem>Sex: {author.sex}</ListGroupItem>
                      <ListGroupItem>
                        Famous Book: {author.books[0]}
                      </ListGroupItem>
                      <ListGroupItem>
                        Birthplace:
                        {ModelsJson.countries[author.nationalityId].name}
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Text>
                  <Link to={`/authors/${index}`}>
                    <Button variant="primary">
                      Learn about {author.author}
                    </Button>
                  </Link> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
