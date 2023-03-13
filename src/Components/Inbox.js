import { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup,Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MailAction } from '../store/MailSlice';
import { ArrowLeft, Dot ,App} from 'react-bootstrap-icons';
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
        
            <Table className='h-100 w-100 ms-4 '>
            <tbody>
                {inbox.map(mail=>(
<tr style={{cursor:'pointer'}} key={mail.id}  onClick={openMailHandler.bind(null,mail)}>
  <td><App/></td>
  <td>{!mail.read&&<Dot  color='blue'size={30} />}</td>
  <td>{mail.subject}</td>
  <td>{mail.content.slice(0,10)}...</td>
  <td>{mail.date}</td>
</tr>
                ))}
              </tbody>
            </Table>
        </Row>
      </Container>
      </>
    );
  }
  
  export default Inbox;