import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getCountry, getBook } from "../../services/API/apiCalls";
import blankBookPic from "../../assets/blankbookimg.jpg";
import styles from "./styles.module.css";

export default function Book() {
  const book = getBook(useParams().bookId);
  const country = getCountry(book.book_country_id);
  Object.keys(book).forEach((k) => {
    if (!book[k]) {
      book[k] = "N/A";
    }
    if (book.book_image === "N/A") {
      book.book_image = blankBookPic;
    }
  });
  return (
    <Container>
      <Row>
        <h1>Book: {book.book_title}</h1>
      </Row>
      <Row>
        <Card
          fluid
          className={styles.card}
          style={{
            border: "3px solid #000",
            backgroundColor: "var(--logo-color)",
          }}
        >
          <Card.Body>
            <b>{book.book_description}</b>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <Row>
        <Col>
          <h3>
            Author{" "}
            <Link to={`/authors/${book.book_author_id}`}>
              <Button variant="outline-dark">{book.book_author}</Button>
            </Link>
          </h3>
        </Col>
        <Col>
          <h3>
            Author Nationality{" "}
            <Link to={`/countries/${book.book_country_id}`}>
              <Button variant="outline-dark">{country.country_name}</Button>
            </Link>
          </h3>
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={4}>
          <Card
            className={styles.card}
            style={{ width: "100%", border: "1px solid white" }}
          >
            <Card.Img
              variant="bottom"
              src={book.book_image}
              style={{
                width: "12rem",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                border: "3px solid #000",
                padding: "0",
              }}
            />
            <Card.Body>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <b>Language:</b> {book.book_language}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Genre:</b> {book.book_categories}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Length:</b> {book.book_pages}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Maturity:</b> {book.book_maturity}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Date Published:</b> {book.book_published}
                  </ListGroupItem>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col fluid>
          <Card
            className={styles.card}
            style={{ width: "100%", border: "1px solid white" }}
          >
            <iframe
              title="map"
              width="100%"
              height="450"
              style={{ border: "0" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?q=${country.country_name.replace(
                " ",
                "+"
              )}&key=AIzaSyC-KQ02tkt96MC7mkMTgCPLT726FOaKpMU`}
            />
          </Card>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
