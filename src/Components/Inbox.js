import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
function Inbox() {
    const email=useSelector(state=>state.auth.email);
    const [inbox, setInbox]=useState([])
    
    const getData=useCallback(async()=>{
        let mailArr=[];
        try{
        const response= await axios.get(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/inbox.json`);
    for(const key in response.data){
        mailArr.push({
            id:key,
            subject:response.data[key].subject,
            content:response.data[key].emailContent
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

    return (
       
      <Container className='mt-5  w-100 ' fluid>
         {inbox.length===0 &&<h1 style={{textAlign:"center"}}>No Emails</h1>}
        <Row   className="w-100 justify-content-center">
          <Col md={12} >
            <ListGroup>
                {inbox.map(mail=>(
                   <ListGroup.Item key={mail.id} action>
                   <div className="d-flex justify-content-between align-items-center">
                     <div>
                       <h5>{mail.subject}</h5>
                       <p>{mail.content}</p>
                     </div>
                     <div>2 days ago</div>
                   </div>
                 </ListGroup.Item>  
                ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export default Inbox;