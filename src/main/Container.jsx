import React from 'react';
import MainMenu from './MainMenu';
import './Container.scss';
import ResourceBar from './ResourceBar';
import MainScreen from './MainScreen';
import LoginScreen from './LoginScreen';
import { AuthRepo } from '../api/AuthRepo';

const Container = () => {
  let isAuthenticated = false;

  const logUser = async () => {
    const user = await AuthRepo.getUser();
    console.log(user);
  };
  const logout = async () => {
    await AuthRepo.signOut();
  };
  return (
    <div className={'Container'}>
      <button onClick={logUser}>getUser</button>
      <button onClick={logout}>logout</button>
      {isAuthenticated ? (
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
