import { getAllCurrencyTypes } from '@/utils/game/currencyData';
import useGameStore from '../general/useGameStore';

const useCurrencies = () => {
  const { data } = useGameStore();
  const methods = {
    getCurrency(type: string) {
      return data.currencies[type].value;
    },
    addCurrency(currencyType: ReturnType<typeof getAllCurrencyTypes>[number], amount: number) {
      if (Number.isNaN(amount)) {
        return;
      }

      data.currencies[currencyType].value += +amount;
    },
    removeCurrency(currencyType: ReturnType<typeof getAllCurrencyTypes>[number], amount: number) {
      if (Number.isNaN(amount)) {
        throw new Error('Amount must be a number');
      }
      if (data.currencies[currencyType].value < amount) {
        throw new Error('Not enough currency');
      }

      data.currencies[currencyType].value -= +amount;
    },
  };

  return methods;
};

export default useCurrencies;
