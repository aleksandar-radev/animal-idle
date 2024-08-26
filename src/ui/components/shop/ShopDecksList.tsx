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
        <Tooltip placement="top" title={<div>Cost: {cm.getDeckCost()} gold</div>}>
          <button className="deck new" onClick={() => cm.buyDeck()} disabled={!cm.getCanBuyDeck()}>
            <Add />
          </button>
        </Tooltip>
      </div>
      <div className="deck-characters">
        <ShopDeckCharacters deckIndex={selectedDeckIndex}></ShopDeckCharacters>
      </div>
    </div>
  );
};

export default ShopDecksList;
