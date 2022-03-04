import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModelsJson } from "./Models";

export function Authors() {
  return (
    <div className="Authors">
      <Container>
        <h1>Authors!</h1>

        <h3>Number of authors: {ModelsJson.authors.length}</h3>

        <Row>
          <Col>Author Name</Col>
          <Col>Author Books</Col>
        </Row>

        {ModelsJson.authors.map((author, index) => (
          <Row>
            <Col>
              <Link to={`/authors/${index}`}>{author.author}</Link>
            </Col>
            <Col>
              {author.bookIds.map((ids, index2) => (
                <Row>
                  <Col>
                    <Link to={`/books/${ids}`}>{author.books[index2]}</Link>
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

export function getAuthor(authorId) {
  return ModelsJson.authors[authorId];
}

export function Author() {
  const params = useParams();
  const author = getAuthor(parseInt(params.authorId, 10));
  return (
    <>
      <h1>Author: {author.author}</h1>

      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`/countries/${author.nationalityId}`}>
          {ModelsJson.countries[author.nationalityId].name}
        </Link>
      </h3>

      <h3>
        Books:
        {author.bookIds.map((ids, index) => (
          <Link to={`/books/${ids}`}>{author.books[index]}</Link>
        ))}
      </h3>

      <h6>
        <Row>
          <Col>
            Genres:{" "}
            {author.bookIds.map((ids, index) => (
              <p>{ModelsJson.books[author.bookIds[index]].genre}</p>
            ))}
          </Col>
          <Col>Sex: {author.sex}</Col>
          <Col>Born: {author.born}</Col>
        </Row>
      </h6>

      <h3>Bio:</h3>

      <p>{author.bio}</p>

      <img src={author.image} alt={author.author} width="180" height="256" />
    </>
  );
}
