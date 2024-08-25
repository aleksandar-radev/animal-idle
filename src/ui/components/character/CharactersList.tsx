import { useMemo, useState } from 'react';
import './CharactersList.scss';
import CharacterDisplay from './CharacterDisplay';
import CharacterAvatar from './CharacterAvatar';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useTranslations from '@/hooks/general/useTranslations';

const CharactersList = () => {
  const { data, settings } = useGameStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [draggedItem, setDraggedItem] = useState(null);
  const isDraggable = useMemo(() => settings.areCharactersDraggable, []);

  const getActiveCharacter = () => {
    return settings.activeCharacter;
  };

  const setActiveCharacter = (character) => {
    settings.activeCharacter = character;
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
        <div className="characters">
          {Array.from(cm.getCharactersInActiveDeck().values()).map((character) => {
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
                <CharacterAvatar characterType={character.type}></CharacterAvatar>
              </div>
            );
          })}
        </div>
      )}
      {getActiveCharacter() && <CharacterDisplay></CharacterDisplay>}
    </div>
  );
};

export default CharactersList;
