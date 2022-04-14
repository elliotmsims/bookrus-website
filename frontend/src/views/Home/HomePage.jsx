import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import authorImage from "../../assets/home-images/author.jpg";
import bookImage from "../../assets/home-images/book.jpg";
import countryImage from "../../assets/home-images/country.jpg";
import splashArt from "../../assets/home-images/splash-art.jpg";
import SearchBar from "../../components/search/SearchBar";
import "./styles.css";

const models = {
  entry: [
    {
      name: "Books",
      desc: "Discover new genres you have never read before, or find something new",
      img: authorImage,
      link: "/books",
    },
    {
      name: "Authors",
      desc: "Learn about famous artists from all the ages, classic to modern",
      img: bookImage,
      link: "/authors",
    },
    {
      name: "Countries",
      desc: "Explore the cultures that inspire countless pieces of literature",
      img: countryImage,
      link: "/countries",
    },
  ],
};

export default function Home() {
  const [globalSearch, setGlobalSearch] = useState(null);
  return (
    <div className="main">
      <Container
        className="home-bg"
        style={{ maxWidth: "100%", backgroundImage: `url(${splashArt})` }}
      >
        <div className="bg-text">
          Information about your favorite stories, all in one place
        </div>
      </Container>
      <div className="bottom">
        <br />
        <Container>
          <Row
            md={3}
            className="dev_cards"
            style={{ justifyContent: "space-evenly" }}
          >
            {models.entry.map((item) => (
              <Col key={item.name}>
                <Card>
                  <Card.Img className="card-img" variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.desc}</Card.Text>
                    <Link to={item.link}>
                      <Button variant="outline-dark">
                        Learn about {item.name}
                      </Button>
                    </Link>
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

// <SearchBar
//   model="Books, Authors, and Countries"
//   setSearch={setGlobalSearch}
// />
