import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../services/API/apiCalls";
import blankProfilePic from "../../assets/blankprofile.png";

export default function Author() {
  const author = getAuthor(useParams().authorId);
  const country = getCountry(author.author_country_id);
  let bookArr;
  if (author.author_books != null) {
    bookArr = author.author_books.replace("[", "").replace("]", "").split(", ");
  } else {
    bookArr = [];
  }
  const books = new Array(bookArr.length);
  for (let i = 0; i < bookArr.length; i += 1) {
    books[i] = getBook(bookArr[i]);
  }
  Object.keys(author).forEach((k) => {
    if (!author[k]) {
      author[k] = "N/A";
    }
    if (author.author_image === "N/A") {
      author.author_image = blankProfilePic;
    }
  });
  return (
    <Container>
      <h1>Author: {author.author_name}</h1>
      <h3>
        {" "}
        Nationality:{" "}
        <Link to={`/countries/${author.author_country_id}`}>
          <Button variant="outline-dark">{country.country_name}</Button>
        </Link>
      </h3>
      <h3>Books:</h3>
      <p>
        {books.map((book) => (
          <Link to={`/books/${book.book_id}`}>
            <Button variant="outline-dark">{book.book_title}</Button>
          </Link>
        ))}
      </p>
      <h6>
        <Row>
          <Col>Best Work: {author.author_top_work}</Col>
          <Col>Work Count: {author.author_work_count.toLocaleString("en-US")}</Col>
          <Col>Main Genre: {author.author_genre} </Col>
          <Col>Born: {author.author_birth_date}</Col>
          <Col>Died: {author.author_death_date}</Col>
        </Row>
      </h6>
      <h3>Bio:</h3>
      <p>{author.author_bio}</p>
      <img
        src={author.author_image}
        alt={blankProfilePic}
        width="180"
        height="256"
      />
      <iframe
        title="map"
        width="450"
        height="450"
        style={{ border: "0" }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?q=${country.country_name.replace(
          " ",
          "+"
        )}&key=AIzaSyC-KQ02tkt96MC7mkMTgCPLT726FOaKpMU`}
      />
    </Container>
  );
}
