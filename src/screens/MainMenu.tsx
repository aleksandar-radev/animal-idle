import { useEffect, useState } from 'react';
import './MainMenu.scss';
import useStore from '../hooks/useStore';
import useAuthRepo from '../hooks/useAuthRepo';
import Settings from '../models/Settings';

const MainMenu = () => {
  const { settings } = useStore();
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
    settings.activeCharacter = null;
    settings.activeMainScreenTab = view;
  };

  const isActiveTab = (tab) => {
    return settings.activeMainScreenTab === tab;
  };

  return (
    <div className={'MainMenu'}>
      <div
        className={`tab ${isActiveTab(Settings.MAIN_SCREEN_CHARACTER_TAB) && 'active'}`}
        onClick={() => changeView(Settings.MAIN_SCREEN_CHARACTER_TAB)}>
        Character
      </div>
      <div
        className={`tab ${isActiveTab(Settings.MAIN_SCREEN_FIGHT_TAB) && 'active'}`}
        onClick={() => changeView(Settings.MAIN_SCREEN_FIGHT_TAB)}>
        Fight
      </div>
      <div
        className={`tab ${isActiveTab(Settings.MAIN_SCREEN_SHOP_TAB) && 'active'}`}
        onClick={() => changeView(Settings.MAIN_SCREEN_SHOP_TAB)}>
        Shop
      </div>
      <div
        className={`tab ${isActiveTab(Settings.MAIN_SCREEN_LEADERBOARD_TAB) && 'active'}`}
        onClick={() => changeView(Settings.MAIN_SCREEN_LEADERBOARD_TAB)}>
        Leaderboard
      </div>
      <div
        className={`tab ${isActiveTab(Settings.MAIN_SCREEN_SETTINGS_TAB) && 'active'}`}
        onClick={() => changeView(Settings.MAIN_SCREEN_SETTINGS_TAB)}>
        Settings
      </div>
      {currentUser?.role === 'admin' && (
        <div
          className={`tab ${isActiveTab(Settings.MAIN_SCREEN_ADMIN_TAB) && 'active'}`}
          onClick={() => changeView(Settings.MAIN_SCREEN_ADMIN_TAB)}>
          Admin
        </div>
      )}
    </div>
  );
};

export default MainMenu;
