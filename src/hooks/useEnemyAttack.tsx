import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import useStore from './useStore';
import useEnemyMethods from './useEnemyMethods';

const useEnemyAttack = () => {
  const { settings, data } = useStore();
  const cm = useCharacterMethods();
  const em = useEnemyMethods();

  useEffect(() => {
    if (em.getCurrentEnemy() === null) {
      setTimeout(() => {
        const randomEnemy = em.getRandomEnemy();
        em.setCurrentEnemy(randomEnemy);
        startAttacking();
      }, 2000);
    }
  }, [em.getCurrentEnemy()]);

  function startAttacking() {
    // TODO: add a death screen, during which no fighting will happen
    // TODO: start atacking after an enemy gets chosen.

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!settings.isFightStarted || !em.getCurrentEnemy()) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < em.getCurrentEnemy().attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        cm.takeDamage(em.getTotalDamage());
        startAttacking();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useEnemyAttack;
