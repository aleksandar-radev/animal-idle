import { useEffect, useState } from 'react';
import useStore from './useStore';

const useCharactersAttack = () => {
  const { data, settings } = useStore();
  let [isAttacking, setIsAttacking] = useState(false);
  useEffect(() => {
    if (data.enemy.current !== null && !isAttacking) {
      data.characters.getCharactersInActiveDeck().forEach((char) => {
        startAttacking(char);
      });
    }
  }, [data.enemy.current]);

  function startAttacking(char) {
    setIsAttacking(true);
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (data.enemy.current === null) {
        setIsAttacking(false);
        return;
      }
      if (settings.isFightStarted) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < char.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        if (data.enemy.current) {
          data.enemy.current.takeDamage(char.getTotalDamage());
        }
        startAttacking(char);
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useCharactersAttack;
