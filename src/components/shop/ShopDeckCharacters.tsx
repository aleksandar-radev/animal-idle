import React, { useMemo, useState } from 'react';
import './ShopDeckCharacters.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import useTranslations from '../../hooks/useTranslations';
import CharacterAvatar from '../character/CharacterAvatar';
import CharactersSelection from '../character/CharactersSelection';

const ShopDeckCharacters = ({ deckName }) => {
  const { data, settings } = useStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [characterSelectionOpen, setCharacterSelectionOpen] = useState(false);

  const addSelectedCharacterToDeck = (characterType) => {
    console.log(deckName);
    console.log(characterType);

    cm.addCharacterToDeck(deckName, characterType);
  };

  const handleCharacterSelectionOpen = () => {
    setCharacterSelectionOpen(true);
  };

  const handleCharacterSelectionClose = () => {
    setCharacterSelectionOpen(false);
  };

  return (
    <div className="ShopDeckCharacters">
      <div className="characters">
        <div className="item new" onClick={handleCharacterSelectionOpen}>
          +
        </div>
        {Array.from(cm.getCharactersInDeck(deckName)).map(([characterType, character]) => {
          console.log(cm.getCharactersInDeck(deckName));
          console.log(characterType);
          const activeCharacter = cm.getActiveCharacterByType(character.type);
          const isUnlocked = activeCharacter && activeCharacter.isUnlocked ? true : false;
          return (
            <div key={character.type} className={`item ${isUnlocked ? '' : 'locked'}`}>
              <CharacterAvatar characterType={character.type}></CharacterAvatar>
            </div>
          );
        })}
      </div>

      <Dialog
        className="CharacterSelection-dialog"
        open={characterSelectionOpen}
        onClose={handleCharacterSelectionClose}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle id="draggable-dialog-title"></DialogTitle>
        <DialogContent>
          <CharactersSelection setSelectedCharacter={addSelectedCharacterToDeck}></CharactersSelection>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopDeckCharacters;
