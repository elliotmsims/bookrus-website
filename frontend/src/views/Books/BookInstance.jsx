import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getBook } from "../../apiCalls";

export default function Book() {
  const book = getBook(parseInt(useParams().bookId, 10));
  return (
    <Container>
      <Row>
        <Col>
          <h2>{book.book_title}</h2>
        </Col>
      </Row>
    </Container>
  );
}
