import { useState } from 'react';
import saveButton from '@/assets/save-button.png';
import './CurrenciesBar.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useDataRepo from '@/hooks/general/useDataRepo';
import useAuthRepo from '@/hooks/general/useAuthRepo';
import Currency from '@/models/Currency';
import useCurrencies from '@/hooks/gameMethods/useCurrencies';

const CurrenciesBar = () => {
  const { data } = useGameStore();
  const dataRepo = useDataRepo();
  const [loading, setLoading] = useState(false);
  const authRepo = useAuthRepo();
  const currencies = useCurrencies();

  const saveProgress = async () => {
    if (loading) return;
    setLoading(true);
    const user = await authRepo.getUser();
    await dataRepo.updateDataByUserId(user.id, data);

    setTimeout(() => {
      setLoading(false);
    }, 1000 * 5);
  };

  return (
    <div className={'CurrenciesBar'}>
      <div className="Random">Gold: {currencies.getCurrency(Currency.CURRENCY_TYPE_GOLD).value}</div>

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
