import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getBook from "../../api/getBook";
import getAuthor from "../../api/getAuthor";
import getCountry from "../../api/getCountry";

export default function Book() {
  const book = getBook(parseInt(useParams().bookId, 10));
  console.log(book.book_title);
  const author = getAuthor(book.book_author_id);
  console.log(author.author_name);
  const country = getCountry(book.book_country_id);
  console.log(country.country_name);
  return (
    <Container>
      <Row>
        <Col>
          <h1>{book.book_title}</h1>
        </Col>
      </Row>
    </Container>
  );
}
