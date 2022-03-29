import {
  Container,
  // Row,
  // Card,
  // ListGroup,
  // Button,
  // ListGroupItem,
} from "react-bootstrap";
// import { Link } from "react-router-dom";

export default function Countries() {
  return (
    <div className="Countries">
      <Container>
        <h1>Countries!</h1>

        <h3>Number of countries: 0</h3>
        {/* <Row xs={1} md={4}>
          {ModelsJson.countries.map((country, index) => (
            <Row>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={country.image} />
                <Card.Body>
                  <Card.Title>{country.name}</Card.Title>
                  <Card.Text>
                    <ListGroup>
                      <ListGroupItem>
                        Population: {country.population}
                      </ListGroupItem>
                      <ListGroupItem>Region: {country.region}</ListGroupItem>
                      <ListGroupItem>Capital: {country.capital}</ListGroupItem>
                      <ListGroupItem>
                        Language: {country.language}
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Text>
                  <Link to={`/countries/${index}`}>
                    <Button variant="primary">
                      Learn about {country.name}
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Row>
          ))}
        </Row>
      
      <Outlet /> */}
      </Container>
    </div>
  );
}
