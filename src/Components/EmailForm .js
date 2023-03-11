import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EmailForm.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

const EmailForm = () => {
    const email=useSelector(state=>state.auth.email)
  const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());
  const [Semail, setSemail]=useState('');
  const [Remail, setRemail]=useState('');
  const [subject, setSubject]=useState('');


  

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    const remail = Remail.split('@')[0];
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    // Code to submit email goes here
    const response=await axios.post(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/sentbox.json`, {Semail:Semail,
Remail:Remail,subject:subject, emailContent:value})
await axios.post(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${remail}/inbox.json`, {Semail:Semail,
Remail:Remail,subject:subject, emailContent:value})
console.log(response.data)
  };
  

  return (
    <Container className=' mt-5 d-flex justify-content-center'>
      <Form onSubmit={handleSubmit} className='bg-light p-4 w-75 h-75'>
      <h3>Compose Email</h3>
      <Form.Group controlId="emailForm.To">
          <Form.Label>From</Form.Label>
          <Form.Control type="email" onChange={(event)=>setSemail(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="emailForm.To">
          <Form.Label>To</Form.Label>
          <Form.Control type="email" placeholder="Enter recipient email" onChange={(event)=>setRemail(event.target.value)} />
        </Form.Group>
       
        <Form.Group controlId="emailForm.Subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Enter subject" onChange={(event)=>setSubject(event.target.value)} />
        </Form.Group>
        <Form.Group controlId="emailForm.Body">
          <Editor
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
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default EmailForm;