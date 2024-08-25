import { useEffect, useState } from 'react';

import Character from '@/models/Character';
import useCharacterMethods from '@/hooks/gameMethods/useCharacterMethods';
import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';
import useGameStore from '@/hooks/general/useGameStore';

const useCharactersAttack = () => {
  const { data, settings, fightState } = useGameStore();
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
