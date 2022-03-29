import {
  Container,
  Row,
  Card,
  ListGroup,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { ModelsJson } from "../../components/Models";

export default function Countries() {
  return (
    <div className="Countries">
      <Container>
        <h1>Countries!</h1>

        <h3>Number of countries: {ModelsJson.countries.length}</h3>
        <Row xs={1} md={4}>
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
      </Container>
      <Outlet />
    </div>
  );
}

// export function getCountry(countryId) {
//   return ModelsJson.countries[countryId];
// }

// export function Country() {
//   const params = useParams();
//   const country = getCountry(parseInt(params.countryId, 10));
//   return (
//     <>
//       <h1>Country: {country.name}</h1>

//       <h3>
//         Authors:
//         {country.authorIds.map((ids, index) => (
//           <Link to={`/authors/${ids}`}>{country.authors[index]}</Link>
//         ))}
//       </h3>

//       <h3>
//         Books:
//         {country.bookIds.map((ids, index) => (
//           <Link to={`/books/${ids}`}>{country.books[index]}</Link>
//         ))}
//       </h3>

//       <h6>
//         <Row>
//           <Col>Capital: {country.capital}</Col>
//           <Col>Language: {country.language}</Col>
//           <Col>Population: {country.population}</Col>
//           <Col>Code: {country.code}</Col>
//         </Row>
//       </h6>

//       <h3>Description:</h3>

//       <p>{country.desc}</p>

//       <img src={country.image} alt={country.name} width="512" height="512" />
//     </>
//   );
// }
