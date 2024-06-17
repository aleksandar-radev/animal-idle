import './CharactersSelection.scss';
import useTranslations from '../../hooks/useTranslations';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import CharacterAvatar from './CharacterAvatar';

const CharactersSelection = ({ setSelectedCharacter }) => {
  const cm = useCharacterMethods();
  const t = useTranslations();

  return (
    <div className="CharactersSelection">
      {cm.getAllCharacterTypes().map((characterType) => {
        return (
          <div key={characterType} className="item" onClick={() => setSelectedCharacter(characterType)}>
            <CharacterAvatar characterType={characterType}></CharacterAvatar>
          </div>
        );
      })}
    </div>
  );
};

export default CharactersSelection;
