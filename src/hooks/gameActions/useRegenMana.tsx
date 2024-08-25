import useGameStore from '@/hooks/general/useGameStore';
import { useEffect } from 'react';

const useRegenMana = () => {
  const { data } = useGameStore();

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
