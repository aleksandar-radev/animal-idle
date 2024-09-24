import { useState } from 'react';
import './ShopDecksList.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useTranslations from '@/hooks/general/useTranslations';
import { Add } from '@mui/icons-material';
import ShopDeckCharacters from './ShopDeckCharacters';
import { Tooltip } from '@mui/material';

const ShopDecksList = () => {
  const [selectedDeckIndex, setSelectedDeckIndex] = useState('0');
  const cm = useCharacterMethods();
  const t = useTranslations();

  return (
    <div className="ShopDecksList">
      <div className="decks">
        {Object.values(cm.getAllDecks()).map((deck) => {
          return (
            <button
              className={`deck ${'' + deck.index === selectedDeckIndex ? 'active' : ''}`}
              key={deck.name}
              onClick={() => setSelectedDeckIndex('' + deck.index)}>
              <div className="deck-name">{deck.name} </div>
            </button>
          );
        })}
        <Tooltip
          placement="right"
          title={<div className="ShopDecksList-new-desk-tooltip">Cost: {cm.getDeckCost()} gold</div>}>
          <div
            className={`deck new ${!cm.getCanBuyDeck() ? 'disabled' : ''}`}
            onClick={() => cm.getCanBuyDeck() && cm.buyDeck()}>
            <Add />
          </div>
        </Tooltip>
      </div>
      <div className="deck-characters">
        <ShopDeckCharacters deckIndex={selectedDeckIndex}></ShopDeckCharacters>
      </div>
    </div>
  );
};

export default ShopDecksList;
