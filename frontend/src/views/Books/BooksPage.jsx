import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../../services/API/apiCalls";
import blankBookPic from "../../assets/blankbookimg.jpg";
import ModelNavigation from "../../components/model-navigation/NavBar";
import Highlight from "../../components/highlighting/Highlighter";
import styles from "./styles.module.css";

export default function Books() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numResults, setNumResults] = useState(10);
  const [sortBooks, setSortBooks] = useState(null);
  const [searchBooks, setSearchBooks] = useState(null);
  const response = getBooks(currentPage, numResults, sortBooks, searchBooks);
  const totalInstances = response.meta_total;
  const books = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/books/${id}`);
  return (
    <div className="Books">
      <br />
      <Container fluid>
        <ModelNavigation
          model="Books"
          setSort={setSortBooks}
          setSearch={setSearchBooks}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </Container>
      <Container>
        <br />
        {totalInstances === 0 && <h2>No Results</h2>}
        <Row style={{ justifyContent: "center" }} xs={1} md={4}>
          {books.map((item) => {
            const book = item;
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
                <Card
                  className={styles.card}
                  style={{ width: "18rem", border: "1px solid white" }}
                >
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
                    <Card.Title>
                      <Highlight
                        string={book.book_title}
                        search={searchBooks}
                      />
                    </Card.Title>
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
