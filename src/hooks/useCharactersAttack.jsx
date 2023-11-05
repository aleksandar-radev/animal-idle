import { useContext, useEffect } from 'react';
import { State } from '../api/Store';

const useCharactersAttack = () => {
  const [store] = useContext(State);

  useEffect(() => {
    if (store.settings.isFightStarted) {
      startFight();
    }
  }, [store.settings.isFightStarted]);

  function startFight() {
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!store.settings.isFightStarted) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < store.enemy.current.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        store.enemy.current.takeDamage(store.characters.getTotalDamage());
        startFight();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useCharactersAttack;
