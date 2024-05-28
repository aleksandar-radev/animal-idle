import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import useStore from './useStore';
import useEnemyMethods from './useEnemyMethods';

const useEnemyAttack = () => {
  const { settings, data } = useStore();
  const chars = useCharacterMethods();
  const enemy = useEnemyMethods();

  useEffect(() => {
    if (enemy.getCurrentEnemy() === null) {
      setTimeout(() => {
        const randomEnemy = enemy.getRandomEnemy();
        enemy.setCurrentEnemy(randomEnemy);
        startAttacking();
      }, 2000);
    }
  }, [enemy.getCurrentEnemy()]);

  function startAttacking() {
    // TODO: add a death screen, during which no fighting will happen
    // TODO: start atacking after an enemy gets chosen.

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (settings.isFightStarted || !enemy.getCurrentEnemy()) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < enemy.getCurrentEnemy().attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        chars.takeDamage(enemy.getTotalDamage());
        startAttacking();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useEnemyAttack;
