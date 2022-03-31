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
import { getAuthors, getCountry } from "../../apiCalls";
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
        <Row xs={1} md={4}>
          {authors.map((item) => {
            const author = item.attributes;
            if (!author.author_birth_date) {
              author.author_birth_date = "unkown";
            }
            if (!author.author_death_date) {
              author.author_death_date = "unkown";
            }
            if (!author.author_image) {
              author.author_image = blankProfilePic;
            }
            const country = getCountry(author.author_country_id);
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
                          Work Count: {author.author_work_count}
                        </ListGroupItem>
                        <ListGroupItem>
                          Birth: {author.author_birth_date}
                        </ListGroupItem>
                        <ListGroupItem>
                          Death: {author.author_death_date}
                        </ListGroupItem>
                        <ListGroupItem>
                          Nationality: {country.country_name}
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
