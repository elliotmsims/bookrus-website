import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getBook from "../../api/getBook";

export default function Book() {
  const book = getBook(parseInt(useParams().bookId, 10));
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
