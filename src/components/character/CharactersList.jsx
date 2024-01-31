import React, { useState } from 'react';
import './CharactersList.scss';
import CharacterDisplay from './CharacterDisplay';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';

const CharactersList = () => {
  const { store } = useStore();
  const [draggedItem, setDraggedItem] = useState(null);

  const getActiveCharacter = () => {
    return store.settings?.activeCharacter;
  };

  const setActiveCharacter = (character) => {
    store.settings?.setActiveCharacter(character);
  };

  const getCharacterById = (id) => {
    const mappedCharacter = store?.data?.characters?.map[id];
    return store?.characters[mappedCharacter];
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
    if (!draggedItem || draggedItem.name === targetItem.name) return;

    const draggedIndex = Object.entries(store.data.characters.map).find((key) => key[1] === draggedItem.type);
    const targetIndex = Object.entries(store.data.characters.map).find((key) => key[1] === targetItem.type);

    store.data.characters.map[draggedIndex[0]] = targetItem.type;
    store.data.characters.map[targetIndex[0]] = draggedItem.type;
  };

  return (
    <div className="CharactersList">
      {!getActiveCharacter() &&
        store.characters.getActiveCharacters().map((character) => {
          const isDraggable = store.settings.areCharactersDraggable;
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
