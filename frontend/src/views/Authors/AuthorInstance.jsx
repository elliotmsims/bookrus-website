import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { getAuthor, getCountry, getBook } from "../../apiCalls";
import blankProfilePic from "../../assets/blankprofile.png";

export default function Author() {
  const author = getAuthor(useParams().authorId).data.attributes;
  const country = getCountry(author.author_country_id).data.attributes;
  let bookArr;
  if (author.author_books != null) {
    bookArr = author.author_books.replace("[", "").replace("]", "").split(", ");
  } else {
    bookArr = [];
  }
  const books = new Array(bookArr.length);
  for (let i = 0; i < bookArr.length; i += 1) {
    books[i] = getBook(bookArr[i]).data.attributes;
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
          <Col>Work Count: {author.author_work_count}</Col>
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
    </Container>
  );
}
