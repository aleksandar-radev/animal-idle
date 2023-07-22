import React, { useContext } from 'react';
import { State } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
  MAIN_SCREEN_LEADERBOARD_TAB,
  MAIN_SCREEN_ADMIN_TAB,
} from '../constants/gameVariables';
import './MainScreen.scss';
import CharacterScreen from './character/CharacterScreen';
import FightScreen from './fight/FightScreen';
import Shop from './shop/ShopScreen';
import LeaderboardScreen from './leaderboard/LeaderboardScreen';
import AdminScreen from './admin/AdminScreen';

const MainScreen = () => {
  const [store] = useContext(State);

  const activeTab = () => {
    switch (store?.tabs?.activeMainScreenTab) {
      case MAIN_SCREEN_FIGHT_TAB:
        return <FightScreen />;
      case MAIN_SCREEN_SHOP_TAB:
        return <Shop />;
      case MAIN_SCREEN_CHARACTER_TAB:
        return <CharacterScreen />;
      case MAIN_SCREEN_LEADERBOARD_TAB:
        return <LeaderboardScreen />;
      case MAIN_SCREEN_ADMIN_TAB:
        return <AdminScreen />;
      default:
        return <CharacterScreen />;
    }
  };

  return <div className={'MainScreen'}>{activeTab()}</div>;
};

export default MainScreen;
