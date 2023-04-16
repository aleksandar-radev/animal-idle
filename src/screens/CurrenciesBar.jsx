import React, { useContext } from 'react';
import { State } from '../api/Store';
import { CHARACTER_CURRENCY_GOLD } from '../constants/gameVariables';

import './CurrenciesBar.scss';

const CurrenciesBar = () => {
  const [store] = useContext(State);

  const addGold = async (amount) => {
    store.character.addCurrency(CHARACTER_CURRENCY_GOLD, amount);
  };

  const getGold = () => {
    return store.character?.getCurrency([CHARACTER_CURRENCY_GOLD]);
  };
  return (
    <div className={'CurrenciesBar'}>
      <div className="Random">Gold: {getGold()}</div>
      <button onClick={() => addGold(1)}>Add Gold</button>
    </div>
  );
};

export default CurrenciesBar;
