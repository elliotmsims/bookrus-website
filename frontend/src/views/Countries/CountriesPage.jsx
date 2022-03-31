import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../apiCalls";
import MyPagination from "../../components/pagination/Pagination";

export default function Countries() {
  const countries = getCountries(2);
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/countries/${id}`);
  return (
    <div className="Countries">
      <Container fluid>
        <Row>
          <Col>
            <h1>Countries!</h1>
            <h3>Total Countries: 218</h3>
            <MyPagination total={218} totalPage={22} index={5} />
          </Col>
        </Row>
        <Row xs={2} md={4}>
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
