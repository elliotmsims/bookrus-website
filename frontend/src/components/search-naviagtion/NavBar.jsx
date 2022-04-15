/* eslint-disable react/destructuring-assignment */
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import SearchBar from "../search/SearchBar";

export default function SearchNavigation(props) {
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ fontSize: "3em" }}>
          {props.modelName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <SearchBar
              placeholder={props.placeholder}
              handleSearch={(val) => props.setSearch(val)}
            />
          </Nav>
          <Badge bg="dark" text="light">
            total results: {props.totalInstances}
          </Badge>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
