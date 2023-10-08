import { useContext } from 'react';
import { State } from '../../api/Store';
import CharacterAvatar from '../../components/character/CharacterAvatar';
import CharacterItems from '../../components/character/CharacterItems';
import CharacterSkills from '../../components/character/CharacterSkills';
import CharacterStats from '../../components/character/CharacterStats';
import {
  CHARACTER_SCREEN_ITEMS_TAB,
  CHARACTER_SCREEN_SKILLS_TAB,
  CHARACTER_SCREEN_STATS_TAB,
} from '../../constants/gameVariables';
import './CharacterScreen.scss';
import CharacterScreenMenu from './CharacterScreenMenu';

const CharacterScreen = () => {
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
    <div className={'CharacterScreen'}>
      <CharacterScreenMenu></CharacterScreenMenu>
      <CharacterAvatar></CharacterAvatar>
      {activeTab()}
    </div>
  );
};

export default CharacterScreen;
