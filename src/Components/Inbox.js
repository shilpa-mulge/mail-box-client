import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MailAction } from '../store/MailSlice';
import { ArrowLeft, Dot } from 'react-bootstrap-icons';
function Inbox() {
  const dispatch=useDispatch()
    const mail=useSelector(state=>state.auth.email)
    const inbox=useSelector(state=>state.mail.mailData)
    const email=mail.split('@')[0]
    const Navigate=useNavigate()
    const getData=useCallback(async()=>{
        let mailArr=[];
        try{
        const response= await axios.get(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/inbox.json`);
       
    for(const key in response.data){
        mailArr.push({
            id:key,
            read:response.data[key].read,
            Semail:response.data[key].Semail,
            Remail:response.data[key].Remail,
            subject:response.data[key].subject,
            content:response.data[key].content,
            date:response.data[key].date
        })
      }
    dispatch(MailAction.MailArr(mailArr))
   
}catch(error){
   alert(error.response.data.error.message)
}
        },[email]);
    

useEffect(()=>{
    getData()
},[getData])

const openMailHandler=async(mail)=>{
  try{
    await axios.put(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/inbox/${mail.id}.json`, {id:mail.id,Semail:mail.Semail,
    Remail:mail.Remail,subject:mail.subject,content:mail.content, date:mail.date, read:true})
      }catch(error){
        alert(error.response.data.error.message)
      }
dispatch(MailAction.AddMail({id:mail.id,Semail:mail.Semail,
  Remail:mail.Remail,subject:mail.subject,content:mail.content,date:mail.date, read:true}))
dispatch(MailAction.AddNode('inbox'))
  Navigate('/mailDetails')
}
    return (
       <> 
      <Container className='mt-5  w-100 ' fluid>
        <Row>
          <Col><ArrowLeft size={30} onClick={()=>Navigate('/')} /></Col>
      <h1 className='text-center'>INBOX</h1>
      </Row>
         {inbox.length===0 &&<p style={{textAlign:"center"}}>No Emails</p>}
        <Row   className="w-100 justify-content-center">
          <Col md={12} >
            <ListGroup>
                {inbox.map(mail=>(
                   <ListGroup.Item  key={mail.id} action onClick={openMailHandler.bind(null,mail)}>
                   <div className="d-inline-flex ">
                {  <Dot  color={!mail.read?'blue':'black'} size={30} />}
                     <div>
                       <h5>{mail.subject}</h5>
                       <p>{mail.content}</p>
                     </div>
                     <div>{mail.date}</div>
                   </div>
                 </ListGroup.Item>  
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
  
  export default Inbox;