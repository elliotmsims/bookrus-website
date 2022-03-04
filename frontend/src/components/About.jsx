import React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const names = {
  devs: [
    {
      name: "Matthew Escobar",
      description: "test 1",
      gitlab_id: "Matt594",
    },
    {
      name: "Hrithik Ramganesh",
      description: "test 2",
      gitlab_id: "Hrithikr",
    },
    {
      name: "Elliot Sims",
      description: "test 3",
      gitlab_id: "elliotsims",
    },
    {
      name: "Francisco Reyna",
      description: "test 4",
      gitlab_id: "francis0312",
    },
    {
      name: "William Eng",
      description: "test 5",
      gitlab_id: "willeng37",
    },
  ],
};

// About page
export default function About() {
  return (
    <Container>
      <h3>Objective:</h3>
      <p>
        BooksRUs exists to emphasize the literary contributions of different
        cultures around the world. The app will include information regarding
        famous publications around the globe, their authors, and the countries
        they hale from. The vision of BooksRUs is to connect and spread
        knowledge from distant lifestyles and faraway populations to others
        through sharing inspiring stories, insightful biographies, and
        cross-country cultural exchange. This is because, ultimately, the more
        learned we are of each other, the more mindful we are of the ways the
        world work.
      </p>
      <Row
        md={3}
        className="dev_cards"
        style={{ justifyContent: "space-evenly" }}
      >
        {names.devs.map((dev) => (
          <Col>
            <Card>
              <Card.Img variant="top" src="holder.js/100px160" />
              <Card.Body>
                <Card.Title>{dev.name}</Card.Title>
                <Card.Subtitle className="text-muted">
                  {dev.gitlab_id}
                </Card.Subtitle>
                <Card.Text>{dev.description}</Card.Text>
              </Card.Body>
              <ListGroup>
                <ListGroupItem>Commits: </ListGroupItem>
                <ListGroupItem>Issues: </ListGroupItem>
                <ListGroupItem>Tests: </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
