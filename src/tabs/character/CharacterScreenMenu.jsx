import React, { useContext } from 'react';
import { State } from '../../api/Store';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
} from '../../constants/tabs';
import './CharacterScreenMenu.scss';

const CharacterScreenMenu = () => {
  const [store, setStore] = useContext(State);

  const changeView = (view) => {
    store.tabs.setActiveCharacterScreenTab(view);
    setStore({ ...store });
  };

  return (
    <div className={'CharacterScreenMenu'}>
      <div onClick={() => changeView(CHARACTER_SCREEN_STATS_TAB)}>Stats</div>
      <div onClick={() => changeView(CHARACTER_SCREEN_SKILLS_TAB)}>Skills</div>
      <div onClick={() => changeView(CHARACTER_SCREEN_ITEMS_TAB)}>Items</div>
    </div>
  );
};

export default CharacterScreenMenu;
