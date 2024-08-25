import { useState } from 'react';
import './ShopDecksList.scss';
import useStore from '@/hooks/useStore';
import useCharacterMethods from '@/hooks/useCharacterMethods';
import useTranslations from '@/hooks/useTranslations';
import { Add } from '@mui/icons-material';
import ShopDeckCharacters from './ShopDeckCharacters';

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
        <button className="deck new" onClick={() => cm.buyDeck()} disabled={!cm.getCanBuyDeck()}>
          <Add />
        </button>
      </div>
      <div className="deck-characters">
        <ShopDeckCharacters deckIndex={selectedDeckIndex}></ShopDeckCharacters>
      </div>
    </div>
  );
};

export default ShopDecksList;
