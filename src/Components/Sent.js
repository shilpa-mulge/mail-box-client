import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MailAction } from '../store/MailSlice';
import { ArrowLeft } from 'react-bootstrap-icons';
function Sent() {
    const mail=useSelector(state=>state.auth.email)
    const email=mail.split('@')[0]
    const [inbox, setInbox]=useState([])
    const Navigate=useNavigate()
    const dispatch=useDispatch();
    const getData=useCallback(async()=>{
        let mailArr=[];
        try{
        const response= await axios.get(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/sentbox.json`);
    for(const key in response.data){
        mailArr.push({
            id:key,
            Semail:response.data[key].Semail,
            Remail:response.data[key].Remail,
            subject:response.data[key].subject,
            content:response.data[key].emailContent,
            date:response.data[key].date
        })
    }
    setInbox(mailArr)
}catch(error){
    alert(error.response.data.error.message)
}
        },[email]);
    

useEffect(()=>{
    getData()
},[getData])
const openMailDetails=(mail)=>{
  dispatch(MailAction.AddMail(mail))
  dispatch(MailAction.AddNode('sentbox'))
  Navigate('/mailDetails')
}

    return (
       
      <Container className='mt-5 w-100 ' fluid>
      <Row><Col><ArrowLeft size={30} onClick={()=>Navigate('/')} /></Col>
       <h1 className='text-center'>SENT</h1>
         {inbox.length===0 &&<h1 style={{textAlign:"center"}}>No Emails</h1>}</Row>  
        <Row   className="w-100 justify-content-center mt-5">
          <Col md={12} >
            <ListGroup>
                {inbox.map(mail=>(
                   <ListGroup.Item key={mail.id} action onClick={openMailDetails.bind(null,mail)}>
                   <div className="d-flex justify-content-between align-items-center">
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
    );
  }
  
  export default Sent;