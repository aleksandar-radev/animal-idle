import React, { useContext, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';

import './CurrenciesBar.scss';

const CurrenciesBar = () => {
  const [store] = useContext(State);
  const [gold, setGold] = useState(0);

  const addGold = async (amount) => {
    const user = await AuthRepo.getUser();
    DataRepo.updateDataById(user.id, { ...store });
    setGold(gold + amount);
  };
  return (
    <div className={'CurrenciesBar'}>
      <div className="Random">Gold: {gold}</div>
      <button onClick={() => addGold(1)}>Add Gold</button>
    </div>
  );
};

export default CurrenciesBar;
