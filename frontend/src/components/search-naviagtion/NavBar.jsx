/* eslint-disable react/destructuring-assignment */
import { Navbar, Nav, Container } from "react-bootstrap";
import SortDropdown from "../sort/SortDropdown";
import SearchBar from "../search/SearchBar";
import MyPagination from "../pagination/Pagination";

export default function SearchNavigation(props) {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>{props.modelName}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <SearchBar
              placeholder={props.placeholder}
              setSearch={props.setSearch}
            />
          </Nav>
          <br />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
