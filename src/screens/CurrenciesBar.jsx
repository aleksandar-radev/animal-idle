import React, { useContext, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';
import saveButton from '../assets/save-button.png';
import { CHARACTER_CURRENCY_GOLD } from '../constants/gameVariables';
import './CurrenciesBar.scss';

const CurrenciesBar = () => {
  const [store] = useContext(State);
  const [loading, setLoading] = useState(false);

  const saveProgress = async () => {
    if (loading) return;
    setLoading(true);
    const user = await AuthRepo.getUser();
    await DataRepo.updateDataById(user.id, store.data);

    setTimeout(() => {
      setLoading(false);
    }, 1000 * 5);
  };

  const getGold = () => {
    return store.data?.currencies[CHARACTER_CURRENCY_GOLD].value;
  };

  return (
    <div className={'CurrenciesBar'}>
      <div className="Random">Gold: {getGold()}</div>

      <div className="CurrenciesBar-save" onClick={saveProgress}>
        {loading ? (
          <div className="CurrenciesBar-save-loading"></div>
        ) : (
          <img className="CurrenciesBar-save-button" src={saveButton} />
        )}
      </div>
    </div>
  );
};

export default CurrenciesBar;
