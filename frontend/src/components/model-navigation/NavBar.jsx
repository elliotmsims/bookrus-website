/* eslint-disable react/destructuring-assignment */
import { Navbar, Container, Nav } from "react-bootstrap";
import SortDropdown from "../sorting/SortDropdown";
import MyPagination from "../pagination/Pagination";

export default function ModelNavigation(props) {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>{props.model}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <SortDropdown model={props.model} setSort={props.setSort} />
          </Nav>
          <Nav className="justify-content-end">
            <MyPagination
              totalInstances={props.totalInstances}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
