import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../apiCalls";

export default function Author() {
  const author = getAuthor(parseInt(useParams().authorId, 10));
  const country = getCountry(author.author_country_id);
  const arr = author.author_books.replace("[","").replace("]","").split(", ");
  for(let i = 0; i < arr.length; i += 1) {
    console.log(getBook(arr[i]).book_title);
  }

  return (
    <Container>
      <h1>Author: {author.author_name}</h1>
      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`https://api.bookrus.me/country/${author.author_country_id}`}>
          {country.country_name}
        </Link>
      </h3>
      <h3>
        Books:
        <p>
          {
            arr
             .map((id) => (getBook(id).book_title))
          }
        </p>
        {arr.map((id) => (
          <Link to={`https://api.bookrus.me/book/${id}`}>
            {getBook(id).book_title}
          </Link>
        ))}
      </h3>
      <h6>
        <Row>
          {/* <Col>
            Genres:{" "}
            {author.author_books.map((ids, index) => (
              <p>{}</p>
            ))}
          </Col> */}
          <Col>Born: {author.author_birth_date}</Col>
          <Col>Died: {author.author_death_date}</Col>
          <Col>Total Works: {author.author_work_count}</Col>
          <Col>Top Work: {author.author_top_work}</Col>
        </Row>
      </h6>
      <h3>Bio:</h3>
      <p>{author.author_bio}</p>
      <img
        src={author.author_image}
        alt={author.author_name}
        width="180"
        height="256"
      />
    </Container>
  );
}
