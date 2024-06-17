import { useState } from 'react';
import './ShopDecksList.scss';
import useStore from '../../hooks/useStore';
import useCharacterMethods from '../../hooks/useCharacterMethods';
import useTranslations from '../../hooks/useTranslations';
import CharactersList from '../character/CharactersList';
import ShopCharactersList from './ShopCharactersList';
import { Add } from '@mui/icons-material';
import ShopDeckCharacters from './ShopDeckCharacters';
import Deck from '../../models/Deck';

const ShopDecksList = () => {
  const { data, settings } = useStore();
  const [selectedDeck, setSelectedDeck] = useState(Deck.DEFAULT_DECK_NAME);
  const cm = useCharacterMethods();
  const t = useTranslations();

  return (
    <div className="ShopDecksList">
      <div className="decks">
        {Object.values(cm.getAllDecks()).map((deck) => {
          return (
            <button
              className={`deck ${deck.name === selectedDeck ? 'active' : ''}`}
              key={deck.name}
              onClick={() => setSelectedDeck(deck.name)}>
              <div className="deck-name">{deck.name} </div>
            </button>
          );
        })}
        <button className="deck new" onClick={() => cm.buyDeck()} disabled={!cm.getCanBuyDeck()}>
          <Add />
        </button>
      </div>
      <div className="deck-characters">
        <ShopDeckCharacters deckName={selectedDeck}></ShopDeckCharacters>
      </div>
    </div>
  );
};

export default ShopDecksList;
