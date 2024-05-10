import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import useDataManager from '../hooks/useDataManager';
import './Container.scss';
import CurrenciesBar from './CurrenciesBar';
import LoginScreen from './LoginScreen';
import MainMenu from './MainMenu';
import MainScreen from './MainScreen';

const Container = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLoaded = useDataManager();

  useEffect(() => {
    (async () => {
      const user = await AuthRepo.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUser(user);
    })();
  }, []);

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <div className={'Container'}>
      {isAuthenticated() && isLoaded ? (
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
