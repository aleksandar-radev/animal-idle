import React, { useEffect, useState } from 'react';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
  MAIN_SCREEN_LEADERBOARD_TAB,
  MAIN_SCREEN_SETTINGS_TAB,
  MAIN_SCREEN_ADMIN_TAB,
} from '../helpers/constants/gameVariables';
import './MainMenu.scss';
import useStore from '../hooks/useStore';
import useAuthRepo from '../hooks/useAuthRepo';

const MainMenu = () => {
  const { store } = useStore();
  const [currentUser, setCurrentUser] = useState(null);
  const authRepo = useAuthRepo();

  useEffect(() => {
    const getUser = async () => {
      const user = await authRepo.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  const changeView = (view) => {
    store.settings.setActiveCharacter(null);
    store.settings.setActiveMainScreenTab(view);
  };

  const isActiveTab = (tab) => {
    return store?.settings?.activeMainScreenTab === tab;
  };

  return (
    <div className={'MainMenu'}>
      <div
        className={`tab ${isActiveTab(MAIN_SCREEN_CHARACTER_TAB) && 'active'}`}
        onClick={() => changeView(MAIN_SCREEN_CHARACTER_TAB)}>
        Character
      </div>
      <div
        className={`tab ${isActiveTab(MAIN_SCREEN_FIGHT_TAB) && 'active'}`}
        onClick={() => changeView(MAIN_SCREEN_FIGHT_TAB)}>
        Fight
      </div>
      <div
        className={`tab ${isActiveTab(MAIN_SCREEN_SHOP_TAB) && 'active'}`}
        onClick={() => changeView(MAIN_SCREEN_SHOP_TAB)}>
        Shop
      </div>
      <div
        className={`tab ${isActiveTab(MAIN_SCREEN_LEADERBOARD_TAB) && 'active'}`}
        onClick={() => changeView(MAIN_SCREEN_LEADERBOARD_TAB)}>
        Leaderboard
      </div>
      <div
        className={`tab ${isActiveTab(MAIN_SCREEN_SETTINGS_TAB) && 'active'}`}
        onClick={() => changeView(MAIN_SCREEN_SETTINGS_TAB)}>
        Settings
      </div>
      {currentUser?.role === 'service_role' && (
        <div
          className={`tab ${isActiveTab(MAIN_SCREEN_ADMIN_TAB) && 'active'}`}
          onClick={() => changeView(MAIN_SCREEN_ADMIN_TAB)}>
          Admin
        </div>
      )}
    </div>
  );
};

export default MainMenu;