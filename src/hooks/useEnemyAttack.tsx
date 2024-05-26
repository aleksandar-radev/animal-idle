import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import useStore from './useStore';

const useEnemyAttack = () => {
  const { settings, data } = useStore();
  const chars = useCharacterMethods();

  useEffect(() => {
    if (data.enemy.current === null) {
      setTimeout(() => {
        const randomEnemy = data.enemy.getRandomEnemy();
        data.enemy.current = randomEnemy;
        startAttacking();
      }, 2000);
    }
  }, [data.enemy.current]);

  function startAttacking() {
    // TODO: add a death screen, during which no fighting will happen
    // TODO: start atacking after an enemy gets chosen.

    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (settings.isFightStarted || !data.enemy.current) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < data.enemy.current.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        chars.takeDamage(data.enemy.current.getTotalDamage());
        startAttacking();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useEnemyAttack;
