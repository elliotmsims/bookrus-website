import React from "react";
import "./Home.css";
import {
  Container,
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Typography from "@mui/material/Typography";

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
            Test Header
          </div>
          <Row
            md={3}
            className="dev_cards"
            style={{ justifyContent: "space-evenly" }}
          >
            <Col>
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>name</Card.Title>
                  <Card.Subtitle className="text-muted">subtitle</Card.Subtitle>
                  <Card.Text>description</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
