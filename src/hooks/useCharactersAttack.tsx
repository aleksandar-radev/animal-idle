import { useEffect, useState } from 'react';
import useStore from './useStore';
import useCharacterMethods from './useCharacterMethods';
import useEnemyMethods from './useEnemyMethods';
import Character from '../models/Character';

const useCharactersAttack = () => {
  const { data, settings, fightState } = useStore();
  let [isAttacking, setIsAttacking] = useState(false);
  const cm = useCharacterMethods();
  const em = useEnemyMethods();

  useEffect(() => {
    if (em.getCurrentEnemy() !== null && !isAttacking) {
      cm.getCharactersInActiveDeck().forEach((char) => {
        startAttacking(char);
      });
    }
  }, [em.getCurrentEnemy()]);

  function startAttacking(char: Character) {
    setIsAttacking(true);
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (em.getCurrentEnemy() === null) {
        setIsAttacking(false);
        return;
      }

      if (!settings.isFightStarted || !fightState.isAlive) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < char.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        if (em.getCurrentEnemy()) {
          em.takeDamage(cm.getDamageByCharacterType(char.type));
        }
        startAttacking(char);
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return { isAttacking, setIsAttacking };
};

export default useCharactersAttack;
