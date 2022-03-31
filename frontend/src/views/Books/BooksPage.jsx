import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../apiCalls";
import MyPagination from "../../components/pagination/Pagination";

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalInstances = 13600;
  const books = getBooks(currentPage);
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/books/${id}`);
  return (
    <div className="Books">
      <Container fluid>
        <Row>
          <Col>
            <h1>Books!</h1>
            <MyPagination
              totalInstances={totalInstances}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
        <Row xs={1} md={4}>
          {books.map((item) => {
            const book = item.attributes;
            return (
              <Row>
                <Card style={{ width: "18rem", border: "1px solid white" }}>
                  <button
                    type="button"
                    onClick={() => handleClick(book.book_id)}
                  >
                    <Card.Img
                      variant="top"
                      src={book.book_image}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  <Card.Body>
                    <Card.Title>{book.book_title}</Card.Title>
                    <Card.Text>
                      <ListGroup>
                        <ListGroupItem>
                          Author: {book.book_author}
                        </ListGroupItem>
                        <ListGroupItem>
                          Publication Date: {book.book_published}
                        </ListGroupItem>
                        <ListGroupItem>
                          Language: {book.book_language}
                        </ListGroupItem>
                        <ListGroupItem>
                          Genre: {book.book_categories}
                        </ListGroupItem>
                        <ListGroupItem>Length: {book.book_pages}</ListGroupItem>
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Row>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
