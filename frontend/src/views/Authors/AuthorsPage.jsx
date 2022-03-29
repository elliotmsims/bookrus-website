import {
  Container,
  // Row,
  // Col,
  // Card,
  // ListGroup,
  // Button,
  // ListGroupItem,
} from "react-bootstrap";
// import { Outlet, Link } from "react-router-dom";

export default function Authors() {
  return (
    <div className="Authors">
      <Container>
        <h1>Authors!</h1>

        <h3>Number of authors: 0</h3>
        {/* <Row xs={1} md={4}>
          {ModelsJson.authors.map((author, index) => (
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={author.image} />
                <Card.Body>
                  <Card.Title>{author.author}</Card.Title>
                  <Card.Text>
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
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> */}
      </Container>
    </div>
  );
}
