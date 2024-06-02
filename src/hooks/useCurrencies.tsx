import useStore from './useStore';

const useCurrencies = () => {
  const { data } = useStore();
  const methods = {
    addCurrency(type, amount: number) {
      if (Number.isNaN(amount)) {
        return;
      }

      data.currencies[type].value += +amount;
    },
    removeCurrency(type, amount: number) {
      if (Number.isNaN(amount)) {
        return;
      }

      data.currencies[type].value -= +amount;
    },
  };

  return methods;
};

export default useCurrencies;
