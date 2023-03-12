import React, { useState } from 'react';
import { Container,Row,Col, Form, Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EmailForm.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {SendFill} from 'react-bootstrap-icons'

const EmailForm = () => {
    const mail=useSelector(state=>state.auth.email)
 const email=mail.split('@')[0]
  const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());
  const [Semail, setSemail]=useState('');
  const [Remail, setRemail]=useState('');
  const [subject, setSubject]=useState('');


  

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    const date=new Date()
    const day=date.getDate();
    const month=date.getMonth()+1;
    const year=date.getFullYear();

    const time=`${day}/${month}/${year}`;
    const remail = Remail.split('@')[0];
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    // Code to submit email goes here
    const response=await axios.post(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/sentbox.json`, {Semail:Semail,
Remail:Remail,subject:subject, emailContent:value, date:time})
await axios.post(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${remail}/inbox.json`, {Semail:Semail,
Remail:Remail,subject:subject, emailContent:value, date:time})
console.log(response.data)
  };
  

  return (
    <>
    <Container className='compose' fluid>
      <Row> <h1 className='text-center'>Compose Mail</h1></Row>
      <Row className='justify-content-center'>
      <Form onSubmit={handleSubmit} className='bg-light p-4 w-75 text-center'>
      <Form.Group controlId="emailForm.From"  as={Row} className="mb-3">
          <Form.Label column sm={1}>From:</Form.Label>
          <Col sm={11}>
          <Form.Control type="email" onChange={(event)=>setSemail(event.target.value)} value={mail} />
         </Col>
        </Form.Group>
        <Form.Group controlId="emailForm.To" as={Row} className="mb-3">
          <Form.Label column sm={1}>To:</Form.Label>
          <Col sm={11}>
          <Form.Control type="email" placeholder="Enter recipient email" onChange={(event)=>setRemail(event.target.value)} />
          </Col>
        </Form.Group>
       
        <Form.Group controlId="emailForm.Subject"  as={Row} className="mb-3">
          <Form.Label column sm={1}>Subject</Form.Label>
          <Col sm={11}>
          <Form.Control type="text" placeholder="Enter subject" onChange={(event)=>setSubject(event.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group controlId="emailForm.Body">
          <Editor 
            toolbarStyle={{ height: 100, overflow:'auto'}}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            placeholder="Compose  email"
          />
        </Form.Group>
        <hr/>
        <Button variant="info" type="submit">
          Send<SendFill/>
        </Button>
      </Form>
      </Row>
    </Container>
    </>
  );
};

export default EmailForm;