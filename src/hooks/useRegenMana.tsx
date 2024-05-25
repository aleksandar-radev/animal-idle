import { useEffect } from 'react';
import useStore from './useStore';

const useRegenMana = () => {
  const { store } = useStore();

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
        store.characters['barbarian'].updateMana(1);
        regenMana();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return;
};

export default useRegenMana;
