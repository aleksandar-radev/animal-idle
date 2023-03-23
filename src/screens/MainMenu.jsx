import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import { State } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
} from '../constants/tabs';
import './MainMenu.scss';

const MainMenu = () => {
  const [store, setStore] = useContext(State);

  const navigate = useNavigate();

  const changeView = (view) => {
    store.tabs.setActiveMainScreenTab(view);
    setStore({ ...store });
  };
  const logout = async () => {
    navigate('/login');
    await AuthRepo.signOut();
  };

  return (
    <div className={'MainMenu'}>
      <div className="MainMenu-tab" onClick={() => changeView(MAIN_SCREEN_CHARACTER_TAB)}>
        Character
      </div>
      <div className="MainMenu-tab" onClick={() => changeView(MAIN_SCREEN_FIGHT_TAB)}>
        Fight
      </div>
      <div className="MainMenu-tab" onClick={() => changeView(MAIN_SCREEN_SHOP_TAB)}>
        Shop
      </div>
      <div className="MainMenu-tab MainMenu-logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MainMenu;