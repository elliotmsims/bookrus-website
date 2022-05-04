/* eslint-disable react/destructuring-assignment */
import { Navbar, Nav, Container } from "react-bootstrap";
import SortDropdown from "../sort/SortDropdown";
import SearchBar from "../search/SearchBar";
import MyPagination from "../pagination/Pagination";

export default function ModelNavigation(props) {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: "3em" }}>
          {props.modelName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <SortDropdown model={props.modelName} setSort={props.setSort} />
            <SearchBar
              placeholder={`Find ${props.modelName}`}
              handleSearch={(val) => props.setSearch(val)}
            />
          </Nav>
          <br />
          <Nav className="justify-content-end">
            <MyPagination
              modelName={props.modelName}
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
