import { useEffect, useState } from 'react';
import useStore from './useStore';

const useCharactersAttack = () => {
  const { store } = useStore();
  let [isAttacking, setIsAttacking] = useState(false);
  useEffect(() => {
    if (store.enemy.current !== null && !isAttacking) {
      store.characters.getActiveCharacters().forEach((char) => {
        startAttacking(char);
      });
    }
  }, [store.enemy.current]);

  function startAttacking(char) {
    setIsAttacking(true);
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (store.enemy.current === null) {
        setIsAttacking(false);
        return;
      }
      if (!store.settings.isFightStarted) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < char.attackSpeed) {
        requestAnimationFrame(animateCooldown);
      } else {
        if (store.enemy.current) {
          store.enemy.current.takeDamage(char.getTotalDamage());
        }
        startAttacking(char);
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useCharactersAttack;
