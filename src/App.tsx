import React, { useState } from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { BrowserRouter, useHistory } from 'react-router-dom';
import './App.css';
import { Secure } from './components/Secure/Secure';
import { Login } from './pages/Login/Login';


function App() {
  const [isAuthentificated, setLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ReactFacebookLoginInfo | undefined>();
  const [picture, setPicture] = useState('');

  const history = useHistory();

  const login = (data: any) => {
    console.log('login', data);
    (window as any).FB.logout();
    
    setUserInfo(data);
    setLogin(true);
    history.push('/profile');
  }

  const logout = () => {
    console.log('logout');
    (window as any).FB.logout();
    setLogin(false);
    history.push('/');
  }

  if (!isAuthentificated) return <Login onLogin={login}></Login>
  return (<Secure userInfo={userInfo} onLogout={logout}></Secure>);

  // return(<BrowserRouter>

  // </BrowserRouter>)
}


export default App;
