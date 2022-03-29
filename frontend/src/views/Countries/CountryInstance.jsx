import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Country() {
  const id = parseInt(useParams().countryId, 10) + 1; // FIX THISSSSSSS
  const [country, setCountry] = useState(0);
  useEffect(() => {
    const getCountry = async () => {
      await axios
        .get(`https://api.bookrus.me/country/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setCountry(data.data.attributes);
        });
    };
    getCountry();
  }, []);
  console.log(country);
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
