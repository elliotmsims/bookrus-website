/* eslint-disable react/destructuring-assignment */
import {
  Container,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Highlight from "../highlighting/Highlighter";
import { modelSpecialAttributes } from "../../util/constants/modelAttributes";
import styles from "./styles.module.css";

export default function ModelCards(props) {
  if (props.totalInstances === 0) {
    return <h2>No Results</h2>;
  }
  const specialAttributes = modelSpecialAttributes[props.modelName];
  return (
    <Container>
      <Row style={{ justifyContent: "center" }} xs={2} md={4}>
        {props.modelData.map((item) => {
          const card = item;
          Object.keys(item).forEach((k) => {
            if (!card[k]) {
              card[k] = "N/A";
            }
          });
          if (card[specialAttributes.image] === "N/A") {
            card[specialAttributes.image] = props.blankPic;
          }
          return (
            <Row key={card[specialAttributes.name]}>
              <Card
                onClick={() => props.handleClick(card[specialAttributes.id])}
                className={styles.card}
                style={{ width: "18rem", border: "1px solid white" }}
              >
                <Card.Img
                  variant="top"
                  src={card[specialAttributes.image]}
                  style={{
                    border: "3px solid #000",
                    padding: "0",
                  }}
                />
                <Card.Body>
                  <Card.Title>
                    <Highlight
                      value={card[specialAttributes.name]}
                      search={props.searchModel}
                    />
                  </Card.Title>
                  <ListGroup variant="flush">
                    {Object.keys(props.attributes).map((k) => (
                      <ListGroupItem key={props.attributes[k]}>
                        {props.attributes[k]}
                        {": "}
                        <Highlight value={card[k]} search={props.searchModel} />
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
              <br />
            </Row>
          );
        })}
      </Row>
    </Container>
  );
}
