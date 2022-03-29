import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import getCountry from "../../api/getCountry";

export default function Country() {
  const country = getCountry(parseInt(useParams().countryId, 10));
  return (
    <Container>
      <Row>
        <Col>
          <h1>{country.country_name}</h1>
        </Col>
      </Row>
    </Container>
  );
}
