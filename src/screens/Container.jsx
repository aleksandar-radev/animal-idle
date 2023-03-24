import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import ModelManager from '../models/modelManager';
import './Container.scss';
import CurrenciesBar from './CurrenciesBar';
import LoginScreen from './LoginScreen';
import MainMenu from './MainMenu';
import MainScreen from './MainScreen';

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
      <ModelManager></ModelManager>
      {isAuthenticated() ? (
        <div className="Container-auth">
          <CurrenciesBar></CurrenciesBar>
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
