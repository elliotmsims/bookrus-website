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
import blankBookPic from "../../assets/blankbookimg.jpg";
import MyPagination from "../../components/pagination/Pagination";
import styles from "./styles.module.css";

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const response = getBooks(currentPage);
  const totalInstances = response.meta.total;
  const books = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/books/${id}`);
  return (
    <div className="Books">
      <Container fluid>
        <Row>
          <h1>Books</h1>
        </Row>
        <Row>
          <Col>
            <MyPagination
              totalInstances={totalInstances}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
        <br />
        <Row style={{ justifyContent: "center" }} xs={1} md={4}>
          {books.map((item) => {
            const book = item.attributes;
            Object.keys(book).forEach((k) => {
              if (!book[k]) {
                book[k] = "N/A";
              }
            });
            if (book.book_image === "N/A") {
              book.book_image = blankBookPic;
            }
            return (
              <Row>
                <Card className={styles.card}>
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
                      <ListGroup variant="flush">
                        <ListGroupItem>
                          Author: {book.book_author}
                        </ListGroupItem>
                        <ListGroupItem>
                          Date Publication: {book.book_published}
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
