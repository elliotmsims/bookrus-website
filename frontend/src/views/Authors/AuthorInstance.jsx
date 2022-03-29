import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getAuthor from "../../api/getAuthor";

export default function Author() {
  const author = getAuthor(parseInt(useParams().authorId, 10));
  return (
    <Container>
      <Row>
        <Col>
          <h1>{author.author_name}</h1>
        </Col>
      </Row>
    </Container>
  );
}
