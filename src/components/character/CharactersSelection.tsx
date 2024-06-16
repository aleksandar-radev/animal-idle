import './CharactersSelection.scss';
import useTranslations from '../../hooks/useTranslations';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import CharacterAvatar from './CharacterAvatar';

const CharactersSelection = () => {
  const cm = useCharacterMethods();
  const t = useTranslations();

  return (
    <div className="CharactersSelection">
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      <div key={1} className="item">
        <CharacterAvatar characterType={'barbarian'}></CharacterAvatar>
      </div>
      {cm.getAllCharacters().map((character) => {
        console.log(character);

        return (
          <div key={character} className="item">
            <CharacterAvatar characterType={character}></CharacterAvatar>
          </div>
        );
      })}
    </div>
  );
};

export default CharactersSelection;
