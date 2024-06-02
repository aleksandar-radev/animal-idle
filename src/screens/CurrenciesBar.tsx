import { useState } from 'react';
import saveButton from '../assets/save-button.png';
import './CurrenciesBar.scss';
import useStore from '../hooks/useStore';
import useDataRepo from '../hooks/useDataRepo';
import useAuthRepo from '../hooks/useAuthRepo';
import Currency from '../models/Currency';

const CurrenciesBar = () => {
  const { data } = useStore();
  const dataRepo = useDataRepo();
  const [loading, setLoading] = useState(false);
  const authRepo = useAuthRepo();

  const saveProgress = async () => {
    if (loading) return;
    setLoading(true);
    const user = await authRepo.getUser();
    await dataRepo.updateDataByUserIdAndPremium(user.id, data);

    setTimeout(() => {
      setLoading(false);
    }, 1000 * 5);
  };

  const getGold = () => {
    return data.currencies[Currency.CURRENCY_GOLD].value;
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
