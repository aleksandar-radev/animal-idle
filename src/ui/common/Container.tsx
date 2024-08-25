import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDataManager from '@/hooks/general/useDataManager';
import './Container.scss';
import useAuthRepo from '@/hooks/general/useAuthRepo';
import CurrenciesBar from '@/ui/common/CurrenciesBar';
import MainMenu from '@/ui/common/MainMenu';
import MainScreen from '@/ui/common/MainScreen';
import LoginScreen from '@/ui/common/LoginScreen';

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
