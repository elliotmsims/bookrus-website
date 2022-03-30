import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getBook from "../../api/getBook";
import getAuthor from "../../api/getAuthor";

export default function Book() {
  const book = getBook(parseInt(useParams().bookId, 10));
  const author = getAuthor(parseInt(book.book_author_id, 10));
  return (
    <Container>
      <Row>
        <Col>
          <h2>{book.book_title}</h2>
          <h2>{author.author_name}</h2>
        </Col>
      </Row>
    </Container>
  );
}
