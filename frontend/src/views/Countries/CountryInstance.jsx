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
import blankCountryPic from "../../assets/blankcountryimg.jpg";
import styles from "./styles.module.css";

export default function Country() {
  const country = getCountry(parseInt(useParams().countryId, 10));
  let authorArr;
  if (country.country_authors != null) {
    authorArr = country.country_authors
      .replace("[", "")
      .replace("]", "")
      .split(", ");
  } else {
    authorArr = [];
  }
  const authors =
    authorArr.length > 10 ? new Array(10) : new Array(authorArr.length);
  for (let i = 0; i < authors.length; i += 1) {
    authors[i] = getAuthor(authorArr[i]);
  }
  const books =
    authorArr.length > 10 ? new Array(10) : new Array(authorArr.length);
  let j = 0;
  for (let i = 0; i < authors.length && j < books.length; i += 1) {
    let bookArr = authors[i].author_books;
    if (bookArr != null) {
      bookArr = bookArr.replace("[", "").replace("]", "").split(", ");
    } else {
      bookArr = [];
    }
    while (j < books.length && j < bookArr.length) {
      books[j] = getBook(bookArr[j]);
      j += 1;
    }
  }
  const languageNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });
  let languages = [];
  if (country.country_languages != null) {
    languages = country.country_languages
      .replace("[", "")
      .replace("]", "")
      .split(", ");
  }
  Object.keys(country).forEach((k) => {
    if (!country[k]) {
      country[k] = "N/A";
    }
    if (country.country_image === "N/A") {
      country.country_image = blankCountryPic;
    }
  });
  return (
    <Container>
      <Row>
        <h1>Country: {country.country_name}</h1>
      </Row>
      <Row>
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
      </Row>
      <br />
      <Row>
        <h3>
          Authors{" "}
          {authors.map((author) => (
            <Link to={`/authors/${author.author_id}`}>
              <Button variant="outline-dark">{`${author.author_name}`}</Button>
            </Link>
          ))}
        </h3>
      </Row>
      <Row>
        <h3>
          Books{" "}
          {books.map((book) => (
            <Link to={`/books/${book.book_id}`}>
              <Button variant="outline-dark">{`${book.book_title}`}</Button>
            </Link>
          ))}
        </h3>
      </Row>
      <br />
      <Row>
        <Col xs={4}>
          <Card
            className={styles.card}
            style={{ width: "100%", border: "1px solid white" }}
          >
            <Card.Img
              variant="top"
              src={country.country_image}
              style={{
                border: "3px solid #000",
                padding: "0",
              }}
            />
            <Card.Body>
              <Card.Text>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <b>Region:</b> {country.country_region}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Capital:</b> {country.country_capital_city}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Population:</b>{" "}
                    {country.country_population.toLocaleString("en-US")}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Latitude:</b> {country.country_lat}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Longitude:</b> {country.country_long}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Demonym:</b> {country.country_demonym}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Total Authors:</b> {authorArr.length}
                  </ListGroupItem>
                  <ListGroupItem>
                    <b>Languages:</b>{" "}
                    {languages.map((language, i) => (
                      <text>
                        {languageNames.of(
                          language.replace('"', "").replace('"', "")
                        )}
                        {i < languages.length - 1 && ", "}
                      </text>
                    ))}
                  </ListGroupItem>
                </ListGroup>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col fluid>
          <Card
            fluid
            className={styles.card}
            style={{
              border: "3px solid #000",
              backgroundColor: "var(--logo-color)",
            }}
          >
            <Card.Body>
              <b>{country.country_description}</b>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br />
    </Container>
  );
}
