import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function ClientPage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Welcome to Mailbox</h1>
          <p className="mb-4">Thank you for choosing Mailbox as your email provider. With Mailbox, you can organize your email like never before and enjoy a clutter-free inbox.</p>
          <Button variant="primary">Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientPage;