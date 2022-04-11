import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getCountry, getBook } from "../../apiCalls";
import blankBookPic from "../../assets/blankbookimg.jpg";

export default function Book() {
  const book = getBook(useParams().bookId).data.attributes;
  const country = getCountry(book.book_country_id).data.attributes;
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
      <h1>Book: {book.book_title}</h1>
      <h3>
        Author:{" "}
        <Link to={`/authors/${book.book_author_id}`}>
          <Button variant="outline-dark">{book.book_author}</Button>
        </Link>
      </h3>
      <h3>
        Author Nationality:{" "}
        <Link to={`/countries/${book.book_country_id}`}>
          <Button variant="outline-dark">{country.country_name}</Button>
        </Link>
      </h3>
      <h6>
        <Row>
          <Col>Genre: {book.book_categories}</Col>
          <Col>Pages: {book.book_pages}</Col>
          <Col>Language: {book.book_language}</Col>
          <Col>Maturity: {book.book_maturity}</Col>
          <Col>Date Published: {book.book_published}</Col>
        </Row>
      </h6>
      <h3>Synopsis:</h3>
      <p>{book.book_description}</p>
      <img src={book.book_image} alt={book.book_title} />
    </Container>
  );
}
