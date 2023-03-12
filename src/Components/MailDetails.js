import './MailDetails.css';
import React from "react";
import {Col,Row,Container, Card} from 'react-bootstrap'
import { useSelector } from "react-redux";
function MailDetails() {
    const mail=useSelector(state=>state.mail.mail)
    return (
      <Container className="mt-5 ">
        <Row className='justify-content-center'>
            <Card>
              <Card.Header>Mail Details</Card.Header>
              <Card.Body>
                <Card.Title>{mail.subject}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {mail.Semail} mulgesgmail.com
                </Card.Subtitle>
                <Card.Text>{mail.emailContent}</Card.Text>
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
  export default MailDetails;