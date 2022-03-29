import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import authorImage from "../../assets/home-images/author.jpg";
import bookImage from "../../assets/home-images/book.jpg";
import countryImage from "../../assets/home-images/country.jpg";
import splashArt from "../../assets/home-images/splash-art.jpg";
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
      desc: "Explore the cultures that have inspired countless pieces of literature",
      img: countryImage,
      link: "/countries",
    },
  ],
};

export default function Home() {
  return (
    <div className="main">
      <div className="home-bg" style={{ backgroundImage: `url(${splashArt})` }}>
        <Container style={{ maxWidth: "70%" }}>
          <div className="bg-text">
            Information about your favorite stories, all in one place
          </div>
        </Container>
      </div>
      <div className="bottom">
        <Container style={{ maxWidth: "95%" }}>
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
                    <Link to={item.link}>
                      <Button variant="dark">Learn about {item.name}</Button>
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
