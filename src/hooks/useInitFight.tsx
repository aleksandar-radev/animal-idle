import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import { MAIN_SCREEN_FIGHT_TAB } from '../helpers/constants/gameVariables';
import useStore from './useStore';
import useEnemyMethods from './useEnemyMethods';

const useInitFight = () => {
  const { settings, data } = useStore();
  const characters = useCharacterMethods();
  const enemy = useEnemyMethods();
  let t = null;

  useEffect(() => {
    characters.reset();
    enemy.reset();

    t = setTimeout(() => {
      if (settings.activeMainScreenTab === MAIN_SCREEN_FIGHT_TAB) {
        settings.isFightStarted = true;
      }
    }, 500);

    return () => {
      characters.reset();

      enemy.reset();
      clearTimeout(t);
      settings.isFightStarted = false;
    };
  }, []);

  return;
};

export default useInitFight;
