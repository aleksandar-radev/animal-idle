import { useEffect } from 'react';
import useStore from './useStore';

const useRegenMana = () => {
  const { data } = useStore();

  useEffect(() => {
    regenMana();
  }, []);

  function regenMana() {
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < 2000) {
        requestAnimationFrame(animateCooldown);
      } else {
        data.characters['barbarian'].updateMana(1);
        regenMana();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useRegenMana;
