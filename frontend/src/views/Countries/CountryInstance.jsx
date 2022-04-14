import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../services/API/apiCalls";
import blankCountryPic from "../../assets/blankcountryimg.jpg";
import Map from "../../components/map/Map";

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
      <h1>Country: {country.country_name}</h1>
      <Map
        location={{
          lat: country.country_lat,
          lng: country.country_long,
        }}
        height={300}
        width="100%"
        zoom={4}
      />
      <h3>
        Authors:{" "}
        {authors.map((author) => (
          <Link to={`/authors/${author.author_id}`}>
            <Button variant="outline-dark">{`${author.author_name}`}</Button>
          </Link>
        ))}
      </h3>
      <h3>
        Books:{" "}
        {books.map((book) => (
          <Link to={`/books/${book.book_id}`}>
            <Button variant="outline-dark">{`${book.book_title}`}</Button>
          </Link>
        ))}
      </h3>
      <h6>
        <Row>
          <Col>Region: {country.country_region}</Col>
          <Col>Capital: {country.country_capital_city}</Col>
          <Col>Population: {country.country_population}</Col>
          <Col>Demonym: {country.country_demonym}</Col>
          <Col>
            Languages:
            {languages.map((language) => (
              <p>{language}</p>
            ))}
          </Col>
        </Row>
      </h6>
      <h3>Description:</h3>
      <p>{country.country_description}</p>
      <img
        src={country.country_image}
        alt={country.country_name}
        width="512"
        height="512"
      />
    </Container>
  );
}
