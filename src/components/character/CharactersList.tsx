import React, { useMemo, useState } from 'react';
import './CharactersList.scss';
import CharacterDisplay from './CharacterDisplay';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';

const CharactersList = () => {
  const { data, settings } = useStore();
  const { getCharactersInActiveDeck } = useCharacterMethods();

  let characters = data.characters;
  const [draggedItem, setDraggedItem] = useState(null);
  const isDraggable = useMemo(() => settings.areCharactersDraggable, []);

  const getDecks = () => {
    return Object.keys(data.decks);
  };

  const getActiveCharacter = () => {
    return settings.activeCharacter;
  };

  const setActiveCharacter = (character) => {
    settings.setActiveCharacter(character);
  };

  const getCharacterById = (id) => {
    const mappedCharacter = data.characters.map[id];
    return characters[mappedCharacter];
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    if (!draggedItem || draggedItem.name === targetItem.name || !isDraggable) return;

    const draggedIndex = Object.entries(data.characters.map).find((key) => key[1] === draggedItem.type);
    const targetIndex = Object.entries(data.characters.map).find((key) => key[1] === targetItem.type);

    data.characters.map[draggedIndex[0]] = targetItem.type;
    data.characters.map[targetIndex[0]] = draggedItem.type;
  };

  return (
    <div className="CharactersList">
      {!getActiveCharacter() && (
        <div className="decks">
          {!getActiveCharacter() &&
            getDecks().map((deck) => (
              <div key={deck} className="deck">
                {deck}
              </div>
            ))}
        </div>
      )}
      {!getActiveCharacter() &&
        Array.from(getCharactersInActiveDeck().values()).map((character) => {
          return (
            <div
              key={character.type}
              className="item"
              draggable={isDraggable}
              onClick={() => setActiveCharacter(character.type)}
              onDragStart={(e) => handleDragStart(e, character)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, character)}>
              <CharacterAvatar character={character}></CharacterAvatar>
            </div>
          );
        })}

      {getActiveCharacter() && <CharacterDisplay></CharacterDisplay>}
    </div>
  );
};

export default CharactersList;
