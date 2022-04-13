import { Container, Table } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthors } from "../../services/API/apiCalls";
import ModelNavigation from "../../components/model-navigation/NavBar";
import Highlight from "../../components/highlighting/Highlighter";

export default function Authors() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAuthors, setSortAuthors] = useState(null);
  const [searchAuthors, setSearchAuthors] = useState(null);
  const response = getAuthors(currentPage, sortAuthors, searchAuthors);
  const totalInstances = response.meta_total;
  const authors = response.data;
  const navigate = useNavigate();
  const handleClick = (id) => navigate(`/authors/${id}`);
  return (
    <div className="Authors">
      <br />
      <Container fluid>
        <ModelNavigation
          model="Authors"
          setSort={setSortAuthors}
          setSearch={setSearchAuthors}
          totalInstances={totalInstances}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
      <Container>
        <br />
        {totalInstances === 0 && <h2>No Results</h2>}
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
          <tbody style={{ cursor: "pointer" }}>
            {authors.map((item) => {
              const author = item;
              Object.keys(author).forEach((k) => {
                if (!author[k]) {
                  author[k] = "N/A";
                }
              });
              return (
                <tr onClick={() => handleClick(author.author_id)}>
                  <td>
                    <Highlight
                      string={author.author_name}
                      search={searchAuthors}
                    />
                  </td>
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
