import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import { MAIN_SCREEN_FIGHT_TAB } from '../helpers/constants/gameVariables';
import useStore from './useStore';

const useInitFight = () => {
  const { settings, data } = useStore();
  const { reset } = useCharacterMethods();
  let t = null;

  useEffect(() => {
    console.log(data);
    reset();
    data.enemy.reset();

    t = setTimeout(() => {
      if (settings.activeMainScreenTab === MAIN_SCREEN_FIGHT_TAB) {
        settings.isFightStarted = true;
      }
    }, 500);

    return () => {
      reset();

      data.enemy.reset();
      clearTimeout(t);
      settings.isFightStarted = false;
    };
  }, []);

  return;
};

export default useInitFight;
