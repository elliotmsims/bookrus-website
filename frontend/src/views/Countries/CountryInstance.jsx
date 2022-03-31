import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../apiCalls";

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
  return (
    <Container>
      <h1>Country: {country.country_name}</h1>
      <h3>
        Authors:
        {authors.map((author) => (
          <Link
            to={`/authors/${author.author_id}`}
          >{`${author.author_name}, `}</Link>
        ))}
      </h3>
      <h3>
        Books:
        {books.map((book) => (
          <Link to={`/books/${book.book_id}`}>{`${book.book_title}, `}</Link>
        ))}
      </h3>
      <h6>
        <Row>
          <Col>Region: {country.country_region}</Col>
          <Col>Capital: {country.country_capital_city}</Col>
          <Col>Longitude: {country.country_long}</Col>
          <Col>Latitude: {country.country_lat}</Col>
          <Col>Demonym: {country.country_demonym}</Col>
        </Row>
      </h6>
      {/* NEED A DESCRIPTION 😱 */}
      <img
        src={country.country_image}
        alt={country.country_name}
        width="512"
        height="512"
      />
    </Container>
  );
}
