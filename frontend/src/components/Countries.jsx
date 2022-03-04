import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModelsJson } from "./Models";

export function Countries() {
  return (
    <div className="Countries">
      <Container>
        <h1>Countries!</h1>

        <h3>Number of countries: {ModelsJson.countries.length}</h3>

        <Row>
          <Col>Country Name</Col>
          <Col>Country Authors</Col>
        </Row>

        {ModelsJson.countries.map((country, index) => (
          <Row>
            <Col>
              <Link to={`/countries/${index}`}>{country.name}</Link>
            </Col>
            <Col>
              {country.authorIds.map((ids, index2) => (
                <Row>
                  <Col>
                    <Link to={`/authors/${ids}`}>
                      {country.authors[index2]}
                    </Link>
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        ))}
      </Container>
      <Outlet />
    </div>
  );
}

export function getCountry(countryId) {
  return ModelsJson.countries[countryId];
}

export function Country() {
  const params = useParams();
  const country = getCountry(parseInt(params.countryId, 10));
  return (
    <>
      <h1>Country: {country.name}</h1>

      <h3>
        Authors:
        {country.authorIds.map((ids, index) => (
          <Link to={`/authors/${ids}`}>{country.authors[index]}</Link>
        ))}
      </h3>

      <h3>
        Books:
        {country.bookIds.map((ids, index) => (
          <Link to={`/books/${ids}`}>{country.books[index]}</Link>
        ))}
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

      <img src={country.image} alt={country.name} width="512" height="512" />
    </>
  );
}
