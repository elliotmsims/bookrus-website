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
import { getAuthor, getCountry, getBook } from "../../services/API/apiCalls";
import blankProfilePic from "../../assets/blankprofile.png";
import styles from "./styles.module.css";

export default function Author() {
  const author = getAuthor(useParams().authorId);
  const country = getCountry(author.author_country_id);
  let bookArr;
  if (author.author_books != null) {
    bookArr = author.author_books.replace("[", "").replace("]", "").split(", ");
  } else {
    bookArr = [];
  }
  const books = new Array(bookArr.length);
  for (let i = 0; i < bookArr.length; i += 1) {
    books[i] = getBook(bookArr[i]);
  }
  Object.keys(author).forEach((k) => {
    if (!author[k]) {
      author[k] = "N/A";
    }
    if (author.author_image === "N/A") {
      author.author_image = blankProfilePic;
    }
  });
  return (
    <Container>
      <Row>
        <h1>Author: {author.author_name}</h1>
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
            <b>{author.author_bio}</b>
          </Card.Body>
        </Card>
      </Row>
      <br />
      <Row>
        <h3>
          Nationality{" "}
          <Link to={`/countries/${author.author_country_id}`}>
            <Button variant="outline-dark">{country.country_name}</Button>
          </Link>
        </h3>
      </Row>
      <Col>
        <h3>Books</h3>
        <>
          {books.map((book) => (
            <Link to={`/books/${book.book_id}`}>
              <Button variant="outline-dark">{book.book_title}</Button>
            </Link>
          ))}
        </>
      </Col>
      <br />
      <Row>
        <Col xs={4}>
          <Card
            className={styles.card}
            style={{ width: "100%", border: "1px solid white" }}
          >
            <Card.Img
              variant="bottom"
              src={author.author_image}
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
                    <b>Best Work:</b> {author.author_top_work}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Work Count:</b>{" "}
                    {author.author_work_count.toLocaleString("en-US")}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Main Genre:</b> {author.author_genre}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Born:</b> {author.author_birth_date}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Died:</b> {author.author_death_date}
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
