import CharacterStats from './CharacterStats';
import CharacterItems from './CharacterItems';
import CharacterSkills from './CharacterSkills';
import CharacterScreenMenu from '@/ui/screens/character/CharacterScreenMenu';
import CharacterAvatar from './CharacterAvatar';
import './CharacterDisplay.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import Settings from '@/models/Settings';

const CharacterDisplay = () => {
  const { settings } = useGameStore();
  const cm = useCharacterMethods();
  const character = cm.getActiveCharacter();

  const activeTab = () => {
    switch (settings.activeCharacterScreenTab) {
      case Settings.CHARACTER_SCREEN_STATS_TAB:
        return <CharacterStats />;
      case Settings.CHARACTER_SCREEN_ITEMS_TAB:
        return <CharacterItems />;
      case Settings.CHARACTER_SCREEN_SKILLS_TAB:
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
          <CharacterAvatar characterType={character.type}></CharacterAvatar>
        </div>
        {activeTab()}
      </div>
    )
  );
};

export default CharacterDisplay;
