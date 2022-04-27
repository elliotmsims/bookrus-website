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
        <Navbar.Toggle aria-controls="navbar-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav className="me-auto">
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <div className="v1">
              <Nav.Link href="/countries">Countries</Nav.Link>
            </div>
            <Nav.Link href="/visualizations">Visualizations</Nav.Link>
            <div className="v1">
              <Nav.Link href="/provider-visualizations">
                Provider Visualizations
              </Nav.Link>
            </div>
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
