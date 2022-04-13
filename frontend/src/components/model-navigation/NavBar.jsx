/* eslint-disable react/destructuring-assignment */
import { Navbar, Nav, Container } from "react-bootstrap";
import SortDropdown from "../sort/SortDropdown";
import SearchBar from "../search/SearchBar";
import MyPagination from "../pagination/Pagination";

export default function ModelNavigation(props) {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand>{props.model}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          {props.model !== "Search Results" && (
            <Nav className="me-auto">
              <SortDropdown model={props.model} setSort={props.setSort} />
              <SearchBar model={props.model} setSearch={props.setSearch} />
            </Nav>
          )}
          <br />
          <Nav className="justify-content-end">
            <MyPagination
              totalInstances={props.totalInstances}
              currentPage={props.currentPage}
              setCurrentPage={props.setCurrentPage}
              numResults={props.numResults}
              setNumResults={props.setNumResults}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
