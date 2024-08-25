import './CharactersSelection.scss';
import CharacterAvatar from './CharacterAvatar';
import { useState } from 'react';

const CharactersSelection = ({ onSelectCharacter, availableCharacters }) => {
  const [remainingCharacters, setRemainingCharacters] = useState([...availableCharacters]);

  const handleCharacterSelect = (character, index) => {
    onSelectCharacter(character.type);
    setRemainingCharacters((prevCharacters) => {
      const updatedCharacters = [...prevCharacters];
      updatedCharacters.splice(index, 1);
      return updatedCharacters;
    });
  };

  return (
    <div className="CharactersSelection">
      {remainingCharacters.map((character, index) => (
        <div key={character.type} onClick={() => handleCharacterSelect(character, index)}>
          <CharacterAvatar characterType={character.type} />
        </div>
      ))}
    </div>
  );
};

export default CharactersSelection;
