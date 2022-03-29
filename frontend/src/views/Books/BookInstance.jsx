import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Book() {
  const id = parseInt(useParams().bookId, 10) + 1; // FIX THISSSSSSS
  const [book, setBook] = useState(0);
  useEffect(() => {
    const getBook = async () => {
      await axios
        .get(`https://api.bookrus.me/book/${id}`, {
          headers: { Accept: "application/vnd.api+json" },
        })
        .then((response) => response.data)
        .then((data) => {
          setBook(data.data.attributes);
        });
    };
    getBook();
  }, []);
  console.log(book);
  return (
    <Container>
      <Row>
        <Col>
          <h1>{book.book_title}</h1>
        </Col>
      </Row>
    </Container>
  );
}
