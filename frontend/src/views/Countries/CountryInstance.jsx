import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getCountry } from "../../apiCalls";

export default function Country() {
  const country = getCountry(parseInt(useParams().countryId, 10));
  console.log(country.country_name);
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
