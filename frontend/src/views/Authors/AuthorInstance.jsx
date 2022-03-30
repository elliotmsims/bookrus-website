import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../apiCalls";

export default function Author() {
  const author = getAuthor(parseInt(useParams().authorId, 10));
  const country = getCountry(author.author_country_id);
  const arr = author.author_books.replace("[", "").replace("]", "").split(", ");
  const books = new Array(arr.length);
  for (let i = 0; i < arr.length; i += 1) {
    books[i] = getBook(arr[i]);
  }
  const categories = new Set();
  books.forEach((book) => {
    categories.add(book.book_categories);
  });

  return (
    <Container>
      <h1>Author: {author.author_name}</h1>
      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`/countries/${author.author_country_id}`}>
          {country.country_name}
        </Link>
      </h3>
      <h3>Books:</h3>
      <p>
        {books.map((book) => (
          <Link to={`/books/${book.book_id}`}>{`${book.book_title}, `}</Link>
        ))}
      </p>
      <h6>
        <Row>
          <Col>
            Genres: <p>{categories}</p>
          </Col>
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
