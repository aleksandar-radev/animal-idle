import React, { useMemo, useState } from 'react';
import './ShopCharactersList.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import useTranslations from '@/hooks/general/useTranslations';
import ShopCharacterUnlockMenu from './ShopCharacterUnlockMenu';
import CharacterAvatar from '@/ui/components/character/CharacterAvatar';

const ShopCharactersList = () => {
  const { data, settings } = useGameStore();
  const cm = useCharacterMethods();
  const t = useTranslations();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const isCharacterSelected = () => {
    if (!selectedCharacter) return false;
    return true;
  };

  const handleCharacterSelectionOpen = (type) => {
    setSelectedCharacter(cm.getCharacterByType(type));
  };

  const handleCharacterSelectionClose = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="ShopCharactersList">
      <div className="characters">
        {Array.from(cm.getAllCharacterTypes().values()).map((characterType) => {
          const character = cm.getCharacterByType(characterType);
          const activeCharacter = cm.getActiveCharacterByType(character.type);
          const isUnlocked = activeCharacter && activeCharacter.isUnlocked ? true : false;
          return (
            <div
              key={character.type}
              className={`item ${isUnlocked ? '' : 'locked'}`}
              onClick={() => handleCharacterSelectionOpen(character.type)}>
              <CharacterAvatar characterType={character.type}></CharacterAvatar>
            </div>
          );
        })}
      </div>

      {isCharacterSelected() && (
        <Dialog
          className="ShopCharactersList-dialog"
          open={isCharacterSelected()}
          onClose={handleCharacterSelectionClose}
          aria-labelledby="draggable-dialog-title">
          <DialogTitle id="draggable-dialog-title"></DialogTitle>
          <DialogContent>
            <ShopCharacterUnlockMenu character={selectedCharacter}></ShopCharacterUnlockMenu>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ShopCharactersList;
