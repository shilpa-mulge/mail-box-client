import logo from './logo.svg';
import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import Login from './pages/Login';
import Root from './Components/Root';
function App() {
  return (
    <Root>
    <Routes>
<Route path='/home' element={<ClientPage/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/signup' element={<SignUp/>}/>
    </Routes>
    </Root>
  );
}

export default App;
