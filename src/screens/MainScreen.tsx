import './MainScreen.scss';
import CharacterScreen from './character/CharacterScreen';
import FightScreen from './fight/FightScreen';
import ShopScreen from './shop/ShopScreen';
import LeaderboardScreen from './leaderboard/LeaderboardScreen';
import AdminScreen from './admin/AdminScreen';
import SettingsScreen from './settings/SettingsScreen';
import useStore from '../hooks/useStore';
import Settings from '../models/Settings';

const MainScreen = () => {
  const { settings } = useStore();

  const activeTab = () => {
    switch (settings.activeMainScreenTab) {
      case Settings.MAIN_SCREEN_FIGHT_TAB:
        return <FightScreen />;
      case Settings.MAIN_SCREEN_SHOP_TAB:
        return <ShopScreen />;
      case Settings.MAIN_SCREEN_CHARACTER_TAB:
        return <CharacterScreen />;
      case Settings.MAIN_SCREEN_LEADERBOARD_TAB:
        return <LeaderboardScreen />;
      case Settings.MAIN_SCREEN_SETTINGS_TAB:
        return <SettingsScreen />;
      case Settings.MAIN_SCREEN_ADMIN_TAB:
        return <AdminScreen />;
      default:
        return '';
    }
  };

  return <div className={'MainScreen'}>{activeTab()}</div>;
};

export default MainScreen;
