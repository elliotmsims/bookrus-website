import { Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import getAuthor from "../../api/getAuthor";
// import getBook from "../../api/getBook";
import getCountry from "../../api/getCountry";

export default function Author() {
  const author = getAuthor(parseInt(useParams().authorId, 10));
  console.log(author.author_country_id);
  console.log(author.author_name);
  console.log(author.author_books);
  const country = getCountry(parseInt(author.author_country_id, 10) - 1);
  console.log(country.country_name);

  return (
    // <Container>
    //   <h1>Author: {author.author_name}</h1>

    //   <h3>
    //     {" "}
    //     Nationality:{" "}
    //     <Link to={`https://api.bookrus.me/country/${author.author_country_id}`}>
    //       {BlahBlahBlah}
    //     </Link>
    //   </h3>

    //   <h3>
    //     Books:
    //     {author.author_books.map((ids, index) => (
    //       <Link to={`https://api.bookrus.me/book/${ids}`}>{}</Link>
    //     ))}
    //   </h3>
    // </Container>
    <Container>
      <h1>Author: {author.author_name}</h1>
      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`https://api.bookrus.me/country/${author.author_country_id}`}>
          {country.country_name}
        </Link>
      </h3>
      {/* <h3>
        Books:
        <p>{author.author_books}</p>
        {author.author_books.map((ids, index) => (
          <Link to={`https://api.bookrus.me/book/${ids}`}>{}</Link>
        ))}
      </h3>
      <h6>
        <Row>
          <Col>
            Genres:{" "}
            {author.author_books.map((ids, index) => (
              <p>{}</p>
            ))}
          </Col>
          <Col>Born: {author.author_birth_date}</Col>
          <Col>Died: {author.author_death_date}</Col>
          <Col>Total Works: {author.author_work_count}</Col>
          <Col>Top Work: {author.author_top_work}</Col>
        </Row>
      </h6>
      <h3>Bio:</h3>
      <p>{author.author_bio}</p>
      <img src={author.author_image} alt={author.author_name} width="180" height="256" /> */}
    </Container>
  );
}
