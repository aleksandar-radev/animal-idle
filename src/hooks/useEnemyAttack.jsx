import { useContext, useEffect } from 'react';
import { State } from '../api/Store';

const useEnemyAttack = () => {
  const [store] = useContext(State);

  useEffect(() => {
    if (store.enemy.current === null) {
      const randomEnemy = store.enemy.getRandomEnemy();
      store.enemy.current = randomEnemy;
    }
  }, [store.enemy.current]);

  useEffect(() => {
    setTimeout(() => {
      store.settings.isFightStarted = true;
      startFight();
    }, 2000);
  }, [store.enemy.current]);

  function startFight() {
    // TODO: add a death screen, during which no fighting will happen
    // TODO: start atacking after an enemy gets chosen.

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!store.enemy.current) {
        const randomEnemy = store.enemy.getRandomEnemy();
        store.enemy.current = randomEnemy;
      }

      if (!store.settings.isFightStarted) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < store.enemy.current.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        store.characters.takeDamage(store.enemy.current.getTotalDamage());
        startFight();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useEnemyAttack;
