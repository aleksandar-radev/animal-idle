import React from 'react';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
} from '../../helpers/constants/gameVariables';
import CharacterStats from './CharacterStats';
import CharacterItems from './CharacterItems';
import CharacterSkills from './CharacterSkills';
import CharacterScreenMenu from '../../screens/character/CharacterScreenMenu';
import CharacterAvatar from './CharacterAvatar';
import './CharacterDisplay.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharacterDisplay = () => {
  const { store } = useStore();
  const { getActiveCharacter } = useCharacterMethods();
  const character = getActiveCharacter();

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
    character && (
      <div className="CharacterDisplay">
        <CharacterScreenMenu></CharacterScreenMenu>
        <div className="avatar">
          <CharacterAvatar character={character}></CharacterAvatar>
        </div>
        {activeTab()}
      </div>
    )
  );
};

export default CharacterDisplay;
