import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
  MAIN_SCREEN_LEADERBOARD_TAB,
  MAIN_SCREEN_ADMIN_TAB,
} from '../constants/gameVariables';
import './MainMenu.scss';

const MainMenu = () => {
  const [store] = useContext(State);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await AuthRepo.getUser();
      console.log(user);
      setCurrentUser(user);
    };
    getUser();
  }, []);

  const navigate = useNavigate();

  const changeView = (view) => {
    store.tabs.setActiveMainScreenTab(view);
  };

  const logout = async () => {
    navigate('/login');
    await AuthRepo.signOut();
  };
  const resetProgress = async () => {
    const user = await AuthRepo.getUser();
    await DataRepo.updateDataById(user.id, {});
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
      <div className="MainMenu-tab" onClick={() => changeView(MAIN_SCREEN_LEADERBOARD_TAB)}>
        Leaderboard
      </div>
      {currentUser?.role === 'service_role' && (
        <div className="MainMenu-tab" onClick={() => changeView(MAIN_SCREEN_ADMIN_TAB)}>
          Admin
        </div>
      )}
      <div className="MainMenu-tab" onClick={resetProgress}>
        Reset Progress
      </div>
      <div className="MainMenu-tab" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MainMenu;
