import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataManager from '../hooks/useDataManager';
import './Container.scss';
import CurrenciesBar from './CurrenciesBar';
import LoginScreen from './LoginScreen';
import MainMenu from './MainMenu';
import MainScreen from './MainScreen';
import useAuthRepo from '../hooks/useAuthRepo';

const Container = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isLoaded = useDataManager();
  const authRepo = useAuthRepo();

  useEffect(() => {
    (async () => {
      try {
        const user = await authRepo.getUser();
        setUser(user);
      } catch (error) {
        navigate('/login');
        return;
      }
    })();
  }, []);

  const isAuthenticated = () => {
    return !!user;
  };

  const renderContent = () => {
    if (isAuthenticated() && isLoaded) {
      return (
        <div className="Container-auth">
          <CurrenciesBar />
          <MainMenu />
          <MainScreen />
        </div>
      );
    } else if (isLoaded) {
      return (
        <div className="Container-unauth">
          <LoginScreen />
        </div>
      );
    } else {
      return <div className="Container-empty"></div>;
    }
  };

  return <div className={'Container'}>{renderContent()}</div>;
};

export default Container;
