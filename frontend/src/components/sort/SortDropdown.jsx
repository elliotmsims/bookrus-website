/* eslint-disable react/destructuring-assignment */
import { NavDropdown } from "react-bootstrap";
import { modelAttributes } from "../../util/constants/modelAttributes";

export default function SortDropdown(props) {
  const attributes = modelAttributes[props.model];
  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title="Sort By"
      menuVariant="dark"
    >
      {Object.keys(attributes).map((k) => (
        <NavDropdown.Item
          key={attributes[k]}
          onClick={() => {
            const sortStorageName = `${props.model}-sort-key`;
            localStorage.setItem(sortStorageName, k);
            props.setSort(k.replace("_", "-"));
          }}
        >
          {attributes[k]}
        </NavDropdown.Item>
      ))}
      <NavDropdown.Divider />
      <NavDropdown.Item
        onClick={() => {
          const sortStorageName = `${props.model}-sort-key`;
          localStorage.setItem(sortStorageName, "null");
          props.setSort(null);
        }}
      >
        No Sorting
      </NavDropdown.Item>
    </NavDropdown>
  );
}
