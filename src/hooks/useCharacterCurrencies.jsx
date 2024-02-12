import useStore from './useStore';

const useCharacterCurrencies = () => {
  const { store } = useStore();

  return {
    addCurrency(type, amount) {
      if (isNaN(amount)) {
        return;
      }

      store.data.currencies[type].value += +amount;
      store.data.renderChange();
    },
    removeCurrency(type, amount) {
      if (isNaN(amount)) {
        return;
      }

      store.data.currencies[type].value -= +amount;
      store.data.renderChange();
    },
  };
};

export default useCharacterCurrencies;
