import React, { useContext } from 'react';
import { Context } from '../../api/Store';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterItems from '../../components/CharacterItems';
import CharacterSkills from '../../components/CharacterSkills';
import CharacterStats from '../../components/CharacterStats';
import './CharacterScreen.scss';
import CharacterScreenMenu from './CharacterScreenMenu';

const CharacterScreen = () => {
  const [store] = useContext(Context);

  const activeTab = () => {
    switch (store.activeCharacterScreenTab) {
      case 'stats':
        return <CharacterStats />;
      case 'items':
        return <CharacterItems />;
      case 'skills':
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
