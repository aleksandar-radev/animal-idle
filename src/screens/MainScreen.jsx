import React, { useContext } from 'react';
import { State } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
} from '../constants/tabs';
import CharacterScreen from './character/CharacterScreen';
import FightScreen from './fight/FightScreen';
import './MainScreen.scss';
import Shop from './shop/Shop';

const MainScreen = () => {
  const [store] = useContext(State);

  const activeTab = () => {
    switch (store.tabs.activeMainScreenTab) {
      case MAIN_SCREEN_FIGHT_TAB:
        return <FightScreen />;
      case MAIN_SCREEN_SHOP_TAB:
        return <Shop />;
      case MAIN_SCREEN_CHARACTER_TAB:
        return <CharacterScreen />;
      default:
        return <CharacterScreen />;
    }
  };

  return <div className={'MainScreen'}>{activeTab()}</div>;
};

export default MainScreen;
