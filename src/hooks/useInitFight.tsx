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

  useEffect(() => {
    cm.reset();
    em.reset();

    t = setTimeout(() => {
      if (settings.activeMainScreenTab === Settings.MAIN_SCREEN_FIGHT_TAB) {
        settings.isFightStarted = true;
      }
    }, 500);

    return () => {
      cm.reset();

      em.reset();
      clearTimeout(t);
      settings.isFightStarted = false;
    };
  }, []);

  return;
};

export default useInitFight;
