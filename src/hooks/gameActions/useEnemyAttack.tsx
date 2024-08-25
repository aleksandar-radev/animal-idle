import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';
import useGameStore from '@/hooks/general/useGameStore';
import { useEffect } from 'react';

const useEnemyAttack = () => {
  const { settings, data, fightState } = useGameStore();
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
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!settings.isFightStarted || !em.getCurrentEnemy() || !fightState.isAlive) return;

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
