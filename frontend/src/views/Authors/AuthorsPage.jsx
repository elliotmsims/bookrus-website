import {
  Container,
  // Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../../apiCalls";
import blankProfilePic from "../../assets/blankprofile.png";
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
          <h1>Authors!</h1>
          <MyPagination
            totalInstances={totalInstances}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Row>
        <Row style={{ justifyContent: "center" }} xs={1} md={4}>
          {authors.map((item) => {
            const author = item.attributes;
            Object.keys(author).forEach((k) => {
              if (!author[k]) {
                author[k] = "N/A";
              }
            });
            if (author.author_image === "N/A") {
              author.author_image = blankProfilePic;
            }
            return (
              <Row>
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
                      <ListGroup>
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
              </Row>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
