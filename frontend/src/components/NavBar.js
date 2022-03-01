import React from 'react'
import {Navbar, Container, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/books">Books</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <Nav.Link href="/countries">Countries</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
