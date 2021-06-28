import { useState } from 'react';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import {  useHistory } from 'react-router-dom';
import { getFacebookPages } from './adapters/xhr';
import './App.css';
import { Secure } from './components/Secure/Secure';
import { Login } from './pages/Login/Login';


function App() {
  const [isAuthentificated, setLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<ReactFacebookLoginInfo | undefined>();

  const history = useHistory();

  const login = (data: ReactFacebookLoginInfo) => {
    console.log('login', data);
    setUserInfo(data);
    localStorage.setItem('access_token', data.accessToken);
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
}

export default App;
