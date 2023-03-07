import React, { useEffect, useState } from 'react';
import MainMenu from './MainMenu';
import './Container.scss';
import ResourceBar from './ResourceBar';
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import { AuthRepo } from '../api/AuthRepo';
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const session = await AuthRepo.getSession();
      if (!session?.user) {
        navigate('/login');
        return;
      }
      setUser(session.user);
    })();
  }, []);

  const isAuthenticated = () => {
    return !!user;
  };

  const getCurrentUser = async () => {
    const session = await AuthRepo.getSession();
    setUser(session.user);
    return session.user;
  };
  const logout = async () => {
    await AuthRepo.signOut();
  };
  const reg = () => {
    navigate('/register');
  };
  const login = () => {
    navigate('/login');
  };
  return (
    <div className={'Container'}>
      <button onClick={getCurrentUser}>getUser</button>
      <button onClick={logout}>logout</button>
      <button onClick={reg}>register</button>
      <button onClick={login}>login</button>

      {isAuthenticated() ? (
        <div className="Container-auth">
          <ResourceBar></ResourceBar>
          <MainMenu></MainMenu>
          <MainScreen></MainScreen>
        </div>
      ) : (
        <div className="Container-unauth">
          <LoginScreen></LoginScreen>
        </div>
      )}
    </div>
  );
};

export default Container;
