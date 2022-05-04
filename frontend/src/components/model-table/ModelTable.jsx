/* eslint-disable react/destructuring-assignment */
import { Container, Table } from "react-bootstrap";
import Highlight from "../highlighting/Highlighter";
import { modelSpecialAttributes } from "../../util/constants/modelAttributes";

export default function ModelTable(props) {
  const specialAttributes = modelSpecialAttributes[props.modelName];
  return (
    <Container>
      <Table striped borderless hover variant="dark">
        <thead>
          <tr>
            {Object.keys(props.attributes).map((k) => (
              <th key={props.attributes[k]}>{props.attributes[k]}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {props.modelData.map((item) => {
            const entry = item;
            Object.keys(entry).forEach((k) => {
              if (!entry[k]) {
                entry[k] = "N/A";
              }
            });
            return (
              <tr
                key={entry[specialAttributes.name]}
                onClick={() => props.handleClick(entry[specialAttributes.id])}
              >
                {Object.keys(props.attributes).map((k) => (
                  <td key={entry[k]}>
                    <Highlight value={entry[k]} search={props.searchModel} />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.totalInstances === 0 && (
        <h2 style={{ textAlign: "center", color: "black" }}>No Results</h2>
      )}
    </Container>
  );
}
