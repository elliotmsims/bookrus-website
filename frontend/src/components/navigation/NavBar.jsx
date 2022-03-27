import { Navbar, Container, Nav } from "react-bootstrap";
import "./Navbar.css";
import logo from "../../assets/logo.png";

export default function Navigation() {
  return (
    <Navbar className="nav-color" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="200"
            height="60"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/books">Books</Nav.Link>
          <Nav.Link href="/authors">Authors</Nav.Link>
          <Nav.Link href="/countries">Countries</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
