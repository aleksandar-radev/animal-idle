import React, { useContext, useState } from 'react';
import { State } from '../api/Store';

import './CurrenciesBar.scss';

const CurrenciesBar = () => {
  const [state] = useContext(State);
  const [gold, setGold] = useState(0);

  const addGold = async (amount) => {
    setGold(gold + amount);
  };
  return (
    <div className={'CurrenciesBar'}>
      <div className="Random">Gold: {}</div>
      <button onClick={() => addGold(1)}>Add Gold</button>
    </div>
  );
};

export default CurrenciesBar;
