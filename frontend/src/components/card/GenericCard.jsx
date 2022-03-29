import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function GenericCard(props) {
  const { local } = props;
  return (
    <Link to={local.link} style={{ textDecoration: "none" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{local.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </Card.Text>
          <ListGroup>
            <ListGroupItem>{local.item}</ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    </Link>
  );
}
