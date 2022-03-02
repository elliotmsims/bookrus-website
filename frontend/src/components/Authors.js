import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Authors() {
    return(
      <div class="Authors">
        <Container>
            <h1>Authors!</h1>

            <h3>Number of authors: {models_json.authors.length}</h3>

            <Row>
                <Col>Author Name</Col>
                <Col>Author Books</Col>
            </Row>
            
            {models_json.authors.map((author, index) => {
                return(
                    <Row>
                        <Col>
                            <Link to={`/authors/${index}`}>{author.author}</Link>
                        </Col>
                        <Col>{author.books}</Col>
                    </Row>
                )
            })}
        </Container>
      <Outlet />
      </div>
    )
}

export function Author() {
  let params = useParams();
  let author = getAuthor(parseInt(params.authorId, 10));
  return (
      <>
          <h1>Author: {author.author}</h1>

          <h3>Books: {author.books}</h3>

          <h3>Bio:</h3>

          <p>{author.bio}</p>

          <img src={author.image} alt={author.author} width="180" height="256"/>
      </>
  )
}

export function getAuthor(authorId) {
  return models_json.authors[authorId];
}