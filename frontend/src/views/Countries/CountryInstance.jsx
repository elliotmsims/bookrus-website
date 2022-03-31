import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry } from "../../apiCalls";

export default function Country() {
  const country = getCountry(useParams().countryId);
  let arr;
  if (country.country_authors != null) {
    arr = country.country_authors.replace("[", "").replace("]", "").split(", ");
  } else {
    arr = [];
  }
  const authors = new Array(arr.length);
  for (let i = 0; i < arr.length; i += 1) {
    authors[i] = getAuthor(arr[i]);
  }
  return (
    <Container>
      <h1>Country: {country.country_name}</h1>

      <h3>
        Authors:
        {authors.map((author) => (
          <Link to={`/authors/${author.author_id}`}>{author.author_name}</Link>
        ))}
      </h3>

      {/* <h3>
        Books:
        {country.bookIds.map((ids, index) => (
          <Link to={`/books/${ids}`}>{country.books[index]}</Link>
        ))}
      </h3> */}

      <h6>
        <Row>
          <Col>Capital: {country.country.country_capital_city}</Col>
        </Row>
      </h6>

      <h3>Description:</h3>

      <p>{country.desc}</p>

      <img src={country.image} alt={country.name} width="512" height="512" />
    </Container>
  );
}
