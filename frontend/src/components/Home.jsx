import React from "react";
import "./Home.css";
import { Container, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const models = {
  entry: [
    {
      name: "Books",
      desc: "Discover new genres you have never read before, or find something new",
      img: "book-card.jpg",
    },
    {
      name: "Authors",
      desc: "Learn about famous artists from all the ages, classic to modern",
      img: "author-card.jpg",
    },
    {
      name: "Countries",
      desc: "Explore the cultures that have inspired countless pieces of literature",
      img: "country-card.jpg",
    },
  ],
};

export default function Home() {
  return (
    <div className="main">
      <div
        className="home-bg"
        style={{ backgroundImage: `url('splash-art.jpg')` }}
      />
      <div className="bottom">
        <Container style={{ maxWidth: "100%" }}>
          <div className="bg-text">
            Information about your favorite stories, all in one place
          </div>
          <Row
            md={3}
            className="dev_cards"
            style={{ justifyContent: "space-evenly" }}
          >
            {models.entry.map((item) => (
              <Col>
                <Card>
                  <Card.Img class="card-img" variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.desc}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
