import React, { useContext } from 'react';
import { State } from '../../api/Store';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
} from '../../constants/gameVariables';
import CharacterStats from './CharacterStats';
import CharacterItems from './CharacterItems';
import CharacterSkills from './CharacterSkills';
import CharacterScreenMenu from '../../screens/character/CharacterScreenMenu';
import CharacterAvatar from './CharacterAvatar';

const CharacterDisplay = () => {
  const [store] = useContext(State);

  const activeTab = () => {
    switch (store?.settings?.activeCharacterScreenTab) {
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
    <div className="CharacterDisplay">
      <CharacterScreenMenu></CharacterScreenMenu>
      <CharacterAvatar></CharacterAvatar>
      {activeTab()}
    </div>
  );
};

export default CharacterDisplay;
