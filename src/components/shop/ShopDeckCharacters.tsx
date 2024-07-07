import React, { useMemo, useState, useCallback } from 'react';
import './ShopDeckCharacters.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Close } from '@mui/icons-material';
import useTranslations from '../../hooks/useTranslations';
import CharacterAvatar from '../character/CharacterAvatar';
import CharactersSelection from '../character/CharactersSelection';

const ShopDeckCharacters = ({ deckName }) => {
  const { data, settings } = useStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [characterSelectionOpen, setCharacterSelectionOpen] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const charactersInDeck = useMemo(() => Array.from(cm.getCharactersInDeck(deckName)), [cm, deckName]);

  const getAvailableCharacters = useMemo(() => {
    const allCharacters = Object.values(data.characters);
    return allCharacters.filter((char) => !charactersInDeck.some((deckChar) => deckChar[0] === char.type));
  }, [data.characters, charactersInDeck]);

  const handleSelectCharacter = useCallback(
    (characterType) => {
      cm.addCharacterToDeck(deckName, characterType);
    },
    [cm, deckName],
  );

  const removeSelectedCharacterFromDeck = useCallback(
    (characterType) => {
      cm.removeCharacterFromDeck(deckName, characterType);
      setUpdateTrigger((prev) => prev + 1);
    },
    [cm, deckName],
  );

  const handleCharacterSelectionOpen = useCallback(() => {
    setCharacterSelectionOpen(true);
  }, []);

  const handleCharacterSelectionClose = useCallback(() => {
    setCharacterSelectionOpen(false);
  }, []);

  const renderCharacter = useCallback(
    ([characterType, character]) => {
      const activeCharacter = cm.getActiveCharacterByType(character.type);
      const isUnlocked = activeCharacter && activeCharacter.isUnlocked;
      const handleRemove = (e) => {
        e.stopPropagation();
        removeSelectedCharacterFromDeck(character.type);
      };

      return (
        <div key={character.type} className={`item ${isUnlocked ? '' : 'locked'}`}>
          <div className="remove-char" onClick={handleRemove}>
            <Close />
          </div>
          <CharacterAvatar characterType={character.type} />
        </div>
      );
    },
    [cm, removeSelectedCharacterFromDeck],
  );

  return (
    <div className="ShopDeckCharacters">
      <div className="characters">
        <div className="item new" onClick={handleCharacterSelectionOpen}>
          +
        </div>
        {charactersInDeck.map(renderCharacter)}
      </div>

      <Dialog
        className="CharacterSelection-dialog"
        open={characterSelectionOpen}
        onClose={handleCharacterSelectionClose}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle id="draggable-dialog-title"></DialogTitle>
        <DialogContent>
          <CharactersSelection onSelectCharacter={handleSelectCharacter} availableCharacters={getAvailableCharacters} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopDeckCharacters;
