import {
  Container,
  // Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../apiCalls";

export default function Countries() {
  const countries = getCountries();
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/countries/${id}`);
  return (
    <div className="Countries">
      <Container>
        <Row>
          <h1>Countries!</h1>
          <h3>Number of Countries: {countries.length}</h3>
        </Row>
        <Row xs={1} md={4}>
          {countries.map((item) => {
            const country = item.attributes;
            return (
              <Row>
                <Card style={{ width: "18rem", border: "1px solid white" }}>
                  <button
                    type="button"
                    onClick={() => handleClick(country.country_id)}
                  >
                    <Card.Img
                      variant="top"
                      src={country.country_image}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  <Card.Body>
                    <Card.Title>{country.country_name}</Card.Title>
                    <Card.Text>
                      <ListGroup>
                        <ListGroupItem>
                          Region: {country.country_region}
                        </ListGroupItem>
                        <ListGroupItem>
                          Capital: {country.country_capital_city}
                        </ListGroupItem>
                        <ListGroupItem>
                          Latitude: {country.country_lat}
                        </ListGroupItem>
                        <ListGroupItem>
                          Longitude: {country.country_long}
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Row>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
