import React, { useContext, useEffect } from 'react';
import { State } from '../api/Store';
import {
  MAIN_SCREEN_CHARACTER_TAB,
  MAIN_SCREEN_FIGHT_TAB,
  MAIN_SCREEN_SHOP_TAB,
} from '../api/tabs';
import CharacterScreen from '../tabs/character/CharacterScreen';
import FightScreen from '../tabs/fight/FightScreen';
import Shop from '../tabs/shop/Shop';
import './MainScreen.scss';

const MainScreen = () => {
  const [store] = useContext(State);

  useEffect(() => {}, []);

  const activeTab = () => {
    switch (store.activeMainScreenTab) {
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
