import { CURRENCY_GOLD } from '../constants/gameVariables';
import useStore from './useStore';

const useCharactersSkills = () => {
  const { store } = useStore();
  const chars = store.characters;

  return {
    buySkill(skill) {
      console.log(skill);

      // const gold = store.data.currencies[CURRENCY_GOLD];
      // const cost = this.getCost();
      // if (cost > gold.value) {
      //   return;
      // }

      // store.data.currencies[CURRENCY_GOLD].remove(cost);
      // this.persistentData.level++;
      // store.data.renderChange();
    },
  };
};

export default useCharactersSkills;
