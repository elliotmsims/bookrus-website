import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Countries() {
    return(
      <div class="Countries">
        <Container>
            <h1>Countries!</h1>

            <h3>Number of countries: {models_json.countries.length}</h3>

            <Row>
                <Col>Country Name</Col>
                <Col>Country Authors</Col>
            </Row>
            
            {models_json.countries.map((country, index) => {
                return(
                    <Row>
                        <Col>
                            <Link to={`/countries/${index}`}>{country.name}</Link>
                        </Col>
                        <Col>
                            {country.authorIds.map((ids, index) => {
                                return(
                                    <Row>
                                        <Col>
                                            <Link to={`/authors/${ids}`}>{country.authors[index]}</Link>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
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