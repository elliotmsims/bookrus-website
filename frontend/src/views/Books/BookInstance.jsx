import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getCountry, getBook } from "../../apiCalls";

export default function Book() {
  const book = getBook(useParams().bookId);
  const country = getCountry(book.book_country_id);

  return (
    <Container>
      <h1>Book: {book.book_title}</h1>
      <h3>
        Author:{" "}
        <Link to={`/authors/${book.book_author_id}`}>{book.book_author}</Link>
      </h3>
      <h3>
        Author Nationality:{" "}
        <Link to={`/countries/${book.book_country_id}`}>
          {country.country_name}
        </Link>
      </h3>
      <h6>
        <Row>
          <Col>Genre: {book.book_categories}</Col>
          <Col>Pages: {book.book_pages}</Col>
          <Col>Language: {book.book_language}</Col>
          <Col>Maturity: {book.book_maturity}</Col>
          <Col>Date Published: {book.published}</Col>
        </Row>
      </h6>
      <h3>Synopsis:</h3>
      <p>{book.book_description}</p>
      <img src={book.book_image} alt={book.book_title} />
    </Container>
  );
}
