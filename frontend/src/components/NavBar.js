import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#home">Books</Nav.Link>
          <Nav.Link href="#features">Authors</Nav.Link>
          <Nav.Link href="#pricing">Countries</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </>
  )
}
