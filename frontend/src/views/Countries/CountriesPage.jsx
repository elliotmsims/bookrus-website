import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../services/API/apiCalls";
import blankCountryPic from "../../assets/blankcountryimg.jpg";
import ModelNavigation from "../../components/model-navigation/NavBar";
import styles from "./styles.module.css";

export default function Countries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numResults, setNumResults] = useState(10);
  const [sortCountries, setSortCountries] = useState(null);
  const [searchCountries, setSearchCountries] = useState(null);
  const response = getCountries(
    currentPage,
    numResults,
    sortCountries,
    searchCountries
  );
  const totalInstances = response.meta_total;
  const countries = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/countries/${id}`);
  return (
    <div className="Countries">
      <br />
      <Container fluid>
        <ModelNavigation
          model="Countries"
          setSort={setSortCountries}
          setSearch={setSearchCountries}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numResults={numResults}
          setNumResults={setNumResults}
        />
      </Container>
      <Container>
        <br />
        {totalInstances === 0 && <h2>No Results</h2>}
        <Row style={{ justifyContent: "center" }} xs={2} md={4}>
          {countries.map((item) => {
            const country = item;
            Object.keys(country).forEach((k) => {
              if (!country[k]) {
                country[k] = "N/A";
              }
            });
            if (country.country_image === "N/A") {
              country.country_image = blankCountryPic;
            }
            return (
              <Row>
                <Card
                  className={styles.card}
                  style={{ width: "18rem", border: "1px solid white" }}
                >
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
                      <ListGroup variant="flush">
                        <ListGroupItem>
                          Region: {country.country_region}
                        </ListGroupItem>
                        <ListGroupItem>
                          Population: {country.country_population}
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
