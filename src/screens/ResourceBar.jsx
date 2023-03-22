import React, { useContext, useEffect, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { CurrenciesRepo } from '../api/CurrenciesRepo';
import { State } from '../api/Store';

import './ResourceBar.scss';

const ResourceBar = () => {
  const [state] = useContext(State);
  const [currencies, setCurrencies] = useState(undefined);

  useEffect(() => {
    (async () => {
      const user = await AuthRepo.getUser();
      const res = await CurrenciesRepo.getCurrencies(user.id);

      setCurrencies(res);
    })();
  }, []);

  const addGold = async (amount) => {
    const newAmount = currencies.gold + amount;
    setCurrencies({ ...currencies, gold: newAmount });
    await CurrenciesRepo.updateCurrencies(currencies, { gold: newAmount });
  };
  return (
    <div className={'ResourceBar'}>
      <div className="Random">Gold: {currencies?.gold}</div>
      <button onClick={() => addGold(1)}>Add Gold</button>
    </div>
  );
};

export default ResourceBar;
