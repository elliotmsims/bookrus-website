import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Author() {
  const id = parseInt(useParams().authorId, 10) + 1; // FIX THISSSSSSS
  const [author, setAuthor] = useState(0);
  useEffect(() => {
    const getAuthor = async () => {
      await axios
        .get(`https://api.bookrus.me/author/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setAuthor(data.data.attributes);
        });
    };
    getAuthor();
  }, []);
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
          {'BlahBlahBlah'}
        </Link>
      </h3>
      <h3>
        Books:
        <p>{author.author_books}</p>
        {/* {author.author_books.map((ids, index) => (
          <Link to={`https://api.bookrus.me/book/${ids}`}>{}</Link>
        ))} */}
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
      <img src={author.author_image} alt={author.author_name} width="180" height="256" />
    </Container>
  );
}
