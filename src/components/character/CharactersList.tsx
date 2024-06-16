import React, { useMemo, useState } from 'react';
import './CharactersList.scss';
import CharacterDisplay from './CharacterDisplay';
import CharacterAvatar from './CharacterAvatar';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CharactersSelection from './CharactersSelection';
import useTranslations from '../../hooks/useTranslations';

const CharactersList = () => {
  const { data, settings } = useStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [draggedItem, setDraggedItem] = useState(null);
  const isDraggable = useMemo(() => settings.areCharactersDraggable, []);
  const [characterSelectionOpen, setCharacterSelectionOpen] = useState(false);

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

  const handleCharacterSelectionOpen = () => {
    setCharacterSelectionOpen(true);
  };

  const handleCharacterSelectionClose = () => {
    setCharacterSelectionOpen(false);
  };

  return (
    <div className="CharactersList">
      {!getActiveCharacter() && (
        <div className="characters">
          <div className="item new" onClick={handleCharacterSelectionOpen}>
            +
          </div>

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

      <Dialog
        className="CharacterSelection-dialog"
        open={characterSelectionOpen}
        onClose={handleCharacterSelectionClose}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle id="draggable-dialog-title">{t['charactersSelectionTitle']}</DialogTitle>
        <DialogContent>
          <CharactersSelection></CharactersSelection>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CharactersList;
