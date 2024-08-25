import { useEffect } from 'react';
import useCharacterMethods from '../gameMethods/useCharacterMethods';
import useGameStore from '../general/useGameStore';
import Settings from '@/models/Settings';
import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';

const useInitFight = () => {
  const { settings, data } = useGameStore();
  const cm = useCharacterMethods();
  const em = useEnemyMethods();
  let t = null;

  const resetStats = () => {
    cm.reset();
    em.reset();
  };

  useEffect(() => {
    resetStats();

    t = setTimeout(() => {
      if (settings.activeMainScreenTab === Settings.MAIN_SCREEN_FIGHT_TAB) {
        settings.isFightStarted = true;
      }
    }, 500);

    return () => {
      resetStats();

      clearTimeout(t);
      settings.isFightStarted = false;
    };
  }, []);

  return { resetStats };
};

export default useInitFight;
