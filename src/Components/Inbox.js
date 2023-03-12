import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MailAction } from '../store/MailSlice';
function Inbox() {
  const dispatch=useDispatch()
    const mail=useSelector(state=>state.auth.email)
    const email=mail.split('@')[0]
    const [inbox, setInbox]=useState([])
    const Navigate=useNavigate()
    const getData=useCallback(async()=>{
        let mailArr=[];
        try{
        const response= await axios.get(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/inbox.json`);
    for(const key in response.data){
        mailArr.push({
            id:key,
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

const openMailHandler=(mail)=>{
dispatch(MailAction.AddMail(mail))
  Navigate('/mailDetails')
}
    return (
       <> 
      <Container className='mt-5  w-100 ' fluid>
      <h1 className='text-center p-1 mt-5'>INBOX</h1>
         {inbox.length===0 &&<p style={{textAlign:"center"}}>No Emails</p>}
        <Row   className="w-100 justify-content-center">
          <Col md={12} >
            <ListGroup>
                {inbox.map(mail=>(
                   <ListGroup.Item key={mail.id} action onClick={openMailHandler.bind(null,mail)}>
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
      </>
    );
  }
  
  export default Inbox;