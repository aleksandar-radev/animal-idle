import React, { useContext, useState } from 'react';
import './CharactersList.scss';
import { State } from '../../api/Store';
import CharacterDisplay from './CharacterDisplay';

const CharactersList = () => {
  const [store] = useContext(State);
  const [draggedItem, setDraggedItem] = useState(null);

  const getActiveCharacter = () => {
    return store.settings?.activeCharacter;
  };

  const setActiveCharacter = (character) => {
    store.settings?.setActiveCharacter(character);
  };

  const getCharacters = () => {
    return Object.keys(store?.data?.characters?.map || []);
  };
  const getCharacterById = (id) => {
    const mappedCharacter = store?.data?.characters?.map[id];
    return store?.character.characters[mappedCharacter];
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

    const draggedIndex = Object.entries(store.data.characters.map).find(
      (key) => key[1] === draggedItem.type,
    );
    const targetIndex = Object.entries(store.data.characters.map).find(
      (key) => key[1] === targetItem.type,
    );

    store.data.characters.map[draggedIndex[0]] = targetItem.type;
    store.data.characters.map[targetIndex[0]] = draggedItem.type;
  };

  return (
    <div className="CharactersList">
      {!getActiveCharacter() &&
        getCharacters().map((itemId) => {
          const item = getCharacterById(itemId);
          return (
            <div
              key={item.type}
              className="item"
              draggable
              onClick={() => setActiveCharacter(item)}
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}>
              {item.name}
            </div>
          );
        })}

      {getActiveCharacter() && <CharacterDisplay></CharacterDisplay>}
    </div>
  );
};

export default CharactersList;
