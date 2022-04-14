/* eslint-disable react/destructuring-assignment */
import { NavDropdown } from "react-bootstrap";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function SortDropdown(props) {
  const attributes = modelAttributes[props.model];
  // Object.keys(attributes).map((k) => console.log(k));
  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title="Sort By"
      menuVariant="dark"
    >
      {Object.keys(attributes).map((k) => (
        <NavDropdown.Item onClick={() => props.setSort(k)}>
          {attributes[k]}
        </NavDropdown.Item>
      ))}
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => props.setSort(null)}>
        No Sorting
      </NavDropdown.Item>
    </NavDropdown>
  );
}
