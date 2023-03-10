import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import { Context } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
} from '../api/tabs';
import './MainMenu.scss';

const MainMenu = () => {
  const [store, setStore] = useContext(Context);
  const navigate = useNavigate();

  const changeView = (view) => {
    setStore({ ...store, activeMainScreenTab: view });
  };
  const logout = async () => {
    navigate('/login');
    await AuthRepo.signOut();
  };

  return (
    <div className={'MainMenu'}>
      <div onClick={() => changeView(MAIN_SCREEN_CHARACTER_TAB)}>Character</div>
      <div onClick={() => changeView(MAIN_SCREEN_FIGHT_TAB)}>Fight</div>
      <div onClick={() => changeView(MAIN_SCREEN_SHOP_TAB)}>shop</div>
      <div className="MainMenu-logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MainMenu;
