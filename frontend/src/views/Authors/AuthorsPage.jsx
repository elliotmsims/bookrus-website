import {
  Container,
  Col,
  Row,
  // Card,
  // ListGroup,
  // ListGroupItem,
  Table,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../../apiCalls";
// import blankProfilePic from "../../assets/blankprofile.png";
import MyPagination from "../../components/pagination/Pagination";
// import "./styles.css";

export default function Authors() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalInstances = 4392;
  const authors = getAuthors(currentPage);
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/authors/${id}`);
  return (
    <div className="Authors">
      <Container fluid>
        <Row>
          <h1>Authors</h1>
        </Row>
        <Row>
          <Col>
            <MyPagination
              totalInstances={totalInstances}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
        <br />
        <Table striped borderless hover variant="dark">
          <thead>
            <tr>
              <th>Author Name</th>
              <th>Best Work</th>
              <th>Work Count</th>
              <th>Main Genre</th>
              <th>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((item) => {
              const author = item.attributes;
              Object.keys(author).forEach((k) => {
                if (!author[k]) {
                  author[k] = "N/A";
                }
              });
              return (
                <tr onClick={() => handleClick(author.author_id)}>
                  <td>{author.author_name}</td>
                  <td>{author.author_top_work}</td>
                  <td>{author.author_work_count}</td>
                  <td>{author.author_genre}</td>
                  <td>{author.author_nationality}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

/* <Row>
                <Card style={{ width: "18rem", border: "1px solid white" }}>
                  <button
                    type="button"
                    onClick={() => handleClick(author.author_id)}
                  >
                    <Card.Img
                      variant="top"
                      src={author.author_image}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                  <Card.Body>
                    <Card.Title>{author.author_name}</Card.Title>
                    <Card.Text>
                      <ListGroup variant="flush">
                        <ListGroupItem>
                          Best Work: {author.author_top_work}
                        </ListGroupItem>
                        <ListGroupItem>
                          Work Count: {author.author_work_count}
                        </ListGroupItem>
                        <ListGroupItem>
                          Main Genre: {author.author_genre}
                        </ListGroupItem>
                        <ListGroupItem>
                          Nationality: {author.author_nationality}
                        </ListGroupItem>
                      </ListGroup>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </Row> */
