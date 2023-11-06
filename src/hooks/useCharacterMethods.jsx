import { useContext } from 'react';
import { State } from '../api/Store';

const useCharacterMethods = () => {
  const [store] = useContext(State);
  const chars = store.characters;

  return {
    levelUp(charType) {
      chars[charType].persistentData.level++;
    },

    updateHealth(bonus) {
      const newCurrent = chars.currentHealth + bonus;
      if (newCurrent >= chars.getTotalHealth()) {
        chars.currentHealth = chars.getTotalHealth();
      } else if (newCurrent < 0) {
        throw new Error('Unable to remove mana');
      } else {
        chars.currentHealth = newCurrent;
      }
    },

    updateMana(bonus) {
      const newCurrent = chars.currentMana + bonus;
      if (newCurrent >= chars.getTotalMana()) {
        chars.currentMana = chars.getTotalMana();
      } else {
        chars.currentMana = newCurrent;
      }
    },

    takeDamage(damage) {
      if (damage >= chars.currentHealth) {
        chars.currentHealth = 0;
        chars.isAlive = false;
      } else {
        chars.currentHealth -= damage;
      }
    },

    reset() {
      chars.isAlive = true;
      chars.currentHealth = chars.getTotalHealth();
      chars.currentMana = chars.getTotalMana();
    },
  };
};

export default useCharacterMethods;
