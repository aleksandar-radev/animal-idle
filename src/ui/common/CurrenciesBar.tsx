import { useMemo, useState } from 'react';
import saveButton from '@/assets/save-button.png';
import './CurrenciesBar.scss';
import useGameStore from '@/hooks/general/useGameStore';
import useDataRepo from '@/hooks/general/useDataRepo';
import useAuthRepo from '@/hooks/general/useAuthRepo';
import Currency from '@/models/Currency';

const CurrenciesBar = () => {
  const { data } = useGameStore();
  const dataRepo = useDataRepo();
  const [loading, setLoading] = useState(false);
  const authRepo = useAuthRepo();

  const saveProgress = async () => {
    if (loading) return;
    setLoading(true);
    const user = await authRepo.getUser();
    await dataRepo.updateDataByUserId(user.id, data);

    setTimeout(() => {
      setLoading(false);
    }, 1000 * 5);
  };

  const currencyList = useMemo<Currency[]>(() => {
    return (Object.values(data.currencies || {}) as Currency[]).sort((a, b) => a.index - b.index);
  }, [data.currencies]);

  return (
    <div className={'CurrenciesBar'}>
      <div className="CurrenciesBar-currencies">
        {currencyList.map((currency) => (
          <div key={currency.type} className="CurrenciesBar-currency">
            <span className="CurrenciesBar-currency-name">{currency.name}</span>
            <span className="CurrenciesBar-currency-value">{currency.value.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <button className="CurrenciesBar-save" onClick={saveProgress} disabled={loading} type="button">
        {loading ? (
          <div className="CurrenciesBar-save-loading"></div>
        ) : (
          <img className="CurrenciesBar-save-button" src={saveButton} alt="Save progress" />
        )}
        <span className="CurrenciesBar-save-label">Save</span>
      </button>
    </div>
  );
};

export default CurrenciesBar;
