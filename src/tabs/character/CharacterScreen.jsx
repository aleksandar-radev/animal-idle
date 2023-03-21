import React, { useContext } from 'react';
import { State } from '../../api/Store';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterItems from '../../components/CharacterItems';
import CharacterSkills from '../../components/CharacterSkills';
import CharacterStats from '../../components/CharacterStats';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
} from '../../constants/tabs';
import './CharacterScreen.scss';
import CharacterScreenMenu from './CharacterScreenMenu';

const CharacterScreen = () => {
  const [store] = useContext(State);

  const activeTab = () => {
    switch (store.tabs.activeCharacterScreenTab) {
      case CHARACTER_SCREEN_STATS_TAB:
        return <CharacterStats />;
      case CHARACTER_SCREEN_ITEMS_TAB:
        return <CharacterItems />;
      case CHARACTER_SCREEN_SKILLS_TAB:
        return <CharacterSkills />;
      default:
        return '';
    }
  };

  return (
    <div className={'CharacterScreen'}>
      <CharacterScreenMenu></CharacterScreenMenu>
      <CharacterAvatar></CharacterAvatar>
      {activeTab()}
    </div>
  );
};

export default CharacterScreen;
