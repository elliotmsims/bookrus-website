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
                        <Col>
                            {author.bookIds.map((ids, index) => {
                                return(
                                    <Row>
                                        <Col>
                                            <Link to={`/books/${ids}`}>{author.books[index]}</Link>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Col>
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