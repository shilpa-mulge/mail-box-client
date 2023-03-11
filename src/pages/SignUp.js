import React,{useState} from "react";
import { Container , Form, Button,Row} from "react-bootstrap";
import axios from "axios";
import LoadingSpinner from "../UI/LodingSpinner";

const SignUp=()=>{

    const [isLoding, setIsLoading] = useState(false)
    // Initialize state for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
        if (password === confirmPassword) {
            try {
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB2IbR8h8-w-hfsXzEWYgYExp3fG4R8PQ8', {
                    email: email, password: password, returnSecureToken: true
                })
              alert("User has successfully signed up.")
              const emailid = response.data.email.split('@')[0];
                const token=response.data.idToken
               console.log("Sccessfully signed up")
              
            } catch (error) {
                alert(error.response.data.error.message)
            }
            setEmail('')
            setConfirmPassword('')
            setPassword('')
        } else {
            alert("Password and Confirm Password do not match")
        }
        setIsLoading(false)
    };
    return(
        <>
        <Container className="p-4 mt-5 rounded bg-info w-50" fluid>
        {isLoding &&<p>Loading......</p>}
            <Row className="justify-content-center h1">
            SignUp
            </Row>
            <Row  className="justify-content-center">
<Form className="w-100 bg-success bg-opacity-50 p-4 text-center" onSubmit={handleSubmit}>
    <Form.Group className="mb-3" >
        <Form.Control  type="email" placeholder="Email"  value={email}
     onChange={(event) => setEmail(event.target.value)} required />
    </Form.Group>
    <Form.Group className="mb-3" >
        <Form.Control type="password" placeholder="Password"value={password}
          onChange={(event) => setPassword(event.target.value)} required />
    </Form.Group>
    <Form.Group className="mb-3" >
        <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}  required />
    </Form.Group>
    <Button variant="info" type='submit'>SignUp</Button>
</Form>
</Row>
<Row className="justify-content-center p-4">Already have an account? Login</Row>
        </Container>
        </>
    )
}
export default SignUp;