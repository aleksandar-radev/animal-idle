import React from 'react';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
  MAIN_SCREEN_LEADERBOARD_TAB,
  MAIN_SCREEN_SETTINGS_TAB,
  MAIN_SCREEN_ADMIN_TAB,
} from '../constants/gameVariables';
import './MainScreen.scss';
import CharacterScreen from './character/CharacterScreen';
import FightScreen from './fight/FightScreen';
import ShopScreen from './shop/ShopScreen';
import LeaderboardScreen from './leaderboard/LeaderboardScreen';
import AdminScreen from './admin/AdminScreen';
import SettingsScreen from './settings/SettingsScreen';
import useStore from '../hooks/useStore';

const MainScreen = () => {
  const { store } = useStore();

  const activeTab = () => {
    switch (store?.settings?.activeMainScreenTab) {
      case MAIN_SCREEN_FIGHT_TAB:
        return <FightScreen />;
      case MAIN_SCREEN_SHOP_TAB:
        return <ShopScreen />;
      case MAIN_SCREEN_CHARACTER_TAB:
        return <CharacterScreen />;
      case MAIN_SCREEN_LEADERBOARD_TAB:
        return <LeaderboardScreen />;
      case MAIN_SCREEN_SETTINGS_TAB:
        return <SettingsScreen />;
      case MAIN_SCREEN_ADMIN_TAB:
        return <AdminScreen />;
      default:
        return <CharacterScreen />;
    }
  };

  return <div className={'MainScreen'}>{activeTab()}</div>;
};

export default MainScreen;
