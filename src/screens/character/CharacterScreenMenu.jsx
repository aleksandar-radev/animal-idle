import React from 'react';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
  MAIN_SCREEN_CHARACTER_TAB,
} from '../../constants/gameVariables';
import './CharacterScreenMenu.scss';
import useStore from '../../hooks/useStore';
import useTranslations from '../../hooks/useTranslations';

const CharacterScreenMenu = () => {
  const { store } = useStore();
  const t = useTranslations();

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
        {t['stats']}
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_SKILLS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_SKILLS_TAB)}>
        {t['skills']}
      </div>
      <div
        className={isActiveTab(CHARACTER_SCREEN_ITEMS_TAB) ? 'active' : ''}
        onClick={() => changeView(CHARACTER_SCREEN_ITEMS_TAB)}>
        {t['items']}
      </div>
    </div>
  );
};

export default CharacterScreenMenu;
