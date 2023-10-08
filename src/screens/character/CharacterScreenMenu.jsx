import React, { useContext } from 'react';
import { State } from '../../api/Store';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
  MAIN_SCREEN_CHARACTER_TAB,
} from '../../constants/gameVariables';
import './CharacterScreenMenu.scss';

const CharacterScreenMenu = () => {
  const [store] = useContext(State);

  const changeView = (view) => {
    store.settings.setActiveCharacterScreenTab(view);
  };

  const handleBack = (view) => {
    store.settings.setActiveCharacter(null);
    store.settings.setActiveMainScreenTab(view);
  };

  const isActiveTab = (tab) => {
    return store?.settings?.activeCharacterScreenTab === tab;
  };

  return (
    <div className={'CharacterScreenMenu'}>
      <div onClick={() => handleBack(MAIN_SCREEN_CHARACTER_TAB)}>Back</div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_STATS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_STATS_TAB)}>
        Stats
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_SKILLS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_SKILLS_TAB)}>
        Skills
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_ITEMS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_ITEMS_TAB)}>
        Items
      </div>
    </div>
  );
};

export default CharacterScreenMenu;
