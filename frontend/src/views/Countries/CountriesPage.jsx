import {
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../apiCalls";
import blankCountryPic from "../../assets/blankcountryimg.jpg";
import MyPagination from "../../components/pagination/Pagination";

export default function Countries() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalInstances = 218;
  const countries = getCountries(currentPage);
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/countries/${id}`);
  return (
    <div className="Countries">
      <Container fluid>
        <Row>
          <Col>
            <h1>Countries!</h1>
            <MyPagination
              totalInstances={totalInstances}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
        <Row style={{ justifyContent: "center" }} xs={2} md={4}>
          {countries.map((item) => {
            const country = item.attributes;
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
