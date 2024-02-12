import useCharacterCurrencies from './useCharacterCurrencies';
import useStore from './useStore';

const useCharactersSkills = () => {
  const { store } = useStore();
  const charCurrencies = useCharacterCurrencies();
  // const chars = store.characters;

  return {
    buySkill(skill) {
      const conditionsReached = true;
      const currenciesToRemove = {};
      Object.entries(skill.getCost()).forEach(([type, value]) => {
        const currency = store.data.currencies[type];
        if (value > currency.value || value <= 0) {
          return;
        }
        currenciesToRemove[type] = value;
      });

      if (conditionsReached) {
        Object.entries(currenciesToRemove).forEach(([type, value]) => {
          charCurrencies.removeCurrency(type, value);
        });
        skill.persistentData.level++;
        store.data.renderChange();
      }
    },
  };
};

export default useCharactersSkills;
