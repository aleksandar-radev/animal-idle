import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import useStore from './useStore';
import useEnemyMethods from './useEnemyMethods';
import Settings from '../models/Settings';

const useInitFight = () => {
  const { settings, data } = useStore();
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
