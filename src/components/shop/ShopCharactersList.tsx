import React, { useMemo, useState } from 'react';
import './ShopCharactersList.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import useTranslations from '../../hooks/useTranslations';
import CharacterAvatar from '../character/CharacterAvatar';
import ShopCharacterUnlockMenu from './ShopCharacterUnlockMenu';

const ShopCharactersList = () => {
  const { data, settings } = useStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const isCharacterSelected = () => {
    if (!selectedCharacter) return false;
    return true;
  };

  const handleCharacterSelectionOpen = (type) => {
    console.log(type);
    console.log(cm.getCharacterByType(type));

    setSelectedCharacter(cm.getCharacterByType(type));
  };

  const handleCharacterSelectionClose = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="ShopCharactersList">
      <div className="characters">
        {Array.from(cm.getCharactersInActiveDeck().values()).map((character) => {
          return (
            <div key={character.type} className="item" onClick={() => handleCharacterSelectionOpen(character.type)}>
              <CharacterAvatar characterType={character.type}></CharacterAvatar>
            </div>
          );
        })}
      </div>

      <Dialog
        className="CharacterSelection-dialog"
        open={isCharacterSelected()}
        onClose={handleCharacterSelectionClose}
        aria-labelledby="draggable-dialog-title">
        <DialogTitle id="draggable-dialog-title"></DialogTitle>
        <DialogContent>
          <ShopCharacterUnlockMenu character={selectedCharacter}></ShopCharacterUnlockMenu>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopCharactersList;
