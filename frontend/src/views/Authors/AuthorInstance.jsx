import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../apiCalls";

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
  return (
    <Container>
      <h1>Author: {author.author_name}</h1>
      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`/countries/${author.author_country_id}`}>
          <Button variant="dark">{country.country_name}</Button>
        </Link>
      </h3>
      <h3>Books:</h3>
      <p>
        {books.map((book) => (
          <Link to={`/books/${book.book_id}`}>
            <Button variant="dark">{book.book_title}</Button>
          </Link>
        ))}
      </p>
      <h6>
        <Row>
          <Col> Genre: {author.author_genre} </Col>
          <Col>Born: {author.author_birth_date}</Col>
          <Col>Died: {author.author_death_date}</Col>
          <Col>Total Works: {author.author_work_count}</Col>
          <Col>Top Work: {author.author_top_work}</Col>
        </Row>
      </h6>
      <h3>Bio:</h3>
      <p>{author.author_bio}</p>
      <img
        src={author.author_image}
        alt={author.author_name}
        width="180"
        height="256"
      />
    </Container>
  );
}
