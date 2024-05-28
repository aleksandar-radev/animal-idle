import { useEffect, useState } from 'react';
import useStore from './useStore';
import useCharacterMethods from './useCharacterMethods';
import useEnemyMethods from './useEnemyMethods';

const useCharactersAttack = () => {
  const { data, settings } = useStore();
  let [isAttacking, setIsAttacking] = useState(false);
  const { getCharactersInActiveDeck } = useCharacterMethods();
  const enemy = useEnemyMethods();

  useEffect(() => {
    if (enemy.getCurrentEnemy() !== null && !isAttacking) {
      getCharactersInActiveDeck().forEach((char) => {
        startAttacking(char);
      });
    }
  }, [enemy.getCurrentEnemy()]);

  function startAttacking(char) {
    setIsAttacking(true);
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (enemy.getCurrentEnemy() === null) {
        setIsAttacking(false);
        return;
      }

      if (!settings.isFightStarted) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < char.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        if (enemy.getCurrentEnemy()) {
          enemy.takeDamage(char.getTotalDamage());
        }
        startAttacking(char);
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useCharactersAttack;
