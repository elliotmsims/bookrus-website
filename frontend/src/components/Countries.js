import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Countries() {
    return(
      <div class="Countries">
        <Container>
            <h1>Countries!</h1>

            <h3>Number of countries: {models_json.countries.length}</h3>
            
            {models_json.countries.map((country, index) => {
                return(
                    <Row>
                      <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={country.image} />
                          <Card.Body>
                            <Card.Title>{country.name}</Card.Title>
                            <Card.Text>
                            <ListGroup>
                              <ListGroupItem>Population: {country.population}</ListGroupItem>
                              <ListGroupItem>Region: {country.region}</ListGroupItem>
                              <ListGroupItem>Capital: {country.capital}</ListGroupItem>
                            </ListGroup>
                            </Card.Text>
                            <Link to={`/countries/${index}`}>
                              <Button variant="primary">Learn about {country.name}</Button>
                            </Link>
                          </Card.Body>
                      </Card>
                    </Row>
                )
            })}
        </Container>
      <Outlet />
      </div>
    )
}

export function Country() {
  let params = useParams();
  let country = getCountry(parseInt(params.countryId, 10));
  return (
      <>
          <h1>Country: {country.name}</h1>

          <h3>Authors: 
            {
              country.authorIds.map((ids, index) => {
                return(
                  <Link to={`/authors/${ids}`}>{country.authors[index]}</Link>
                )
              })
            }
          </h3>

          <h3>Books: 
            {
              country.bookIds.map((ids, index) => {
                return(
                  <Link to={`/books/${ids}`}>{country.books[index]}</Link>
                )
              })
            }
          </h3>

          <h6>
              <Row>
                    <Col>Capital: {country.capital}</Col>
                    <Col>Region: {country.region}</Col>
                    <Col>Language: {country.language}</Col>
                    <Col>Population: {country.population}</Col>
                    <Col>Code: {country.code}</Col>
              </Row>
            </h6>

          <h3>Description:</h3>

          <p>{country.desc}</p>

          <img src={country.image} alt={country.name} width="512" height="512"/>
      </>
  )
}

export function getCountry(countryId) {
  return models_json.countries[countryId];
}