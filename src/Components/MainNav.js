import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function MainNav() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Mailbox</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <Nav.Link href="/inbox">Inbox</Nav.Link>
            <Nav.Link href="/sent">Sent</Nav.Link>
            <Nav.Link href="/drafts">Drafts</Nav.Link>
            <Nav.Link href="/newmail">Compose</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;




