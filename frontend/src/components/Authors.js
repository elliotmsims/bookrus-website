import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { models_json } from './Models';

export function Authors() {
    return( 
      <div class="Authors">
        <Container>
            <h1>Authors!</h1>

            <h3>Number of authors: {models_json.authors.length}</h3>
            <Row xs={1} md={4}>
            {models_json.authors.map((author, index) => {
                return(
                  <Col>
                      <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={author.image} />
                        <Card.Body>
                          <Card.Title>{author.author}</Card.Title>
                          <Card.Text>
                          <ListGroup>
                            <ListGroupItem>Born: {author.born}</ListGroupItem>
                            <ListGroupItem>Sex: {author.sex}</ListGroupItem>
                            <ListGroupItem>Famous Book: {author.books[0]}</ListGroupItem>
                          </ListGroup>
                          </Card.Text>
                          <Link to={`/authors/${index}`}>
                            <Button variant="primary">Learn about {author.author}</Button>
                          </Link>
                        </Card.Body>
                      </Card>
                  </Col>
              )
            })}
            </Row>
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

          <h3> Nationality: {<Link to={`/countries/${author.nationalityId}`}>{models_json.countries[author.nationalityId].name}</Link>}</h3>

          <h3>Books: 
            {
              author.bookIds.map((ids, index) => {
                return(
                  <Link to={`/books/${ids}`}>{author.books[index]}</Link>
                )
              })
            }
          </h3>

          <h6>
              <Row>
                    <Col>
                    Genres: {author.bookIds.map((ids, index) => {
                          return(
                            <p>{models_json.books[author.bookIds[index]].genre}</p>
                          )
                        })}
                    </Col>
                    <Col>Sex: {author.sex}</Col>
                    <Col>Born: {author.born}</Col>
              </Row>
            </h6>

          <h3>Bio:</h3>

          <p>{author.bio}</p>

          <img src={author.image} alt={author.author} width="180" height="256"/>
      </>
  )
}

export function getAuthor(authorId) {
  return models_json.authors[authorId];
}