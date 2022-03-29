import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Author() {
  const id = parseInt(useParams().authorId, 10) + 1; // FIX THISSSSSSS
  const [author, setAuthor] = useState(0);
  useEffect(() => {
    const getAuthor = async () => {
      await axios
        .get(`https://api.bookrus.me/author/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setAuthor(data.data.attributes);
        });
    };
    getAuthor();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h1>{author.author_name}</h1>
        </Col>
      </Row>
    </Container>
  );
}
