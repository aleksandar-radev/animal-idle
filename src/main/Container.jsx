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

  return (
    <div className={'Container'}>
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
