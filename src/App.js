
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import Login from './pages/Login';
import Root from './Components/Root';
import EmailForm from './Components/EmailForm ';
import Inbox from './Components/Inbox';
import Sent from './Components/Sent';
import ForgetPass from './Components/ForgetPassWord';
import MailDetails from './Components/MailDetails';
function App() {
  return (
    <Root>
    <Routes>
<Route path='/' element={<ClientPage/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
<Route path='/newmail' element={<EmailForm/>}/>
<Route path='/inbox' element={<Inbox/>}/>
<Route path='/sent' element={<Sent/>}/>
<Route path='/forgetpass' element={<ForgetPass/>}/>
<Route path='/mailDetails' element={<MailDetails/>}/>
    </Routes>
    </Root>
  );
}

export default App;
