import { useContext, useEffect } from 'react';
import { State } from '../api/Store';
import useCharacterMethods from './useCharacterMethods';

const useEnemyAttack = () => {
  const [store] = useContext(State);
  const { takeDamage: charactersTakeDamage } = useCharacterMethods();

  useEffect(() => {
    if (store.enemy.current === null) {
      setTimeout(() => {
        const randomEnemy = store.enemy.getRandomEnemy();
        store.enemy.current = randomEnemy;
        startAttacking();
      }, 2000);
    }
  }, [store.enemy.current]);

  function startAttacking() {
    // TODO: add a death screen, during which no fighting will happen
    // TODO: start atacking after an enemy gets chosen.

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!store.settings.isFightStarted || !store.enemy.current) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < store.enemy.current.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        charactersTakeDamage(store.enemy.current.getTotalDamage());
        startAttacking();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useEnemyAttack;
