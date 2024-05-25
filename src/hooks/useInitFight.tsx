import { useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import { MAIN_SCREEN_FIGHT_TAB } from '../helpers/constants/gameVariables';
import useStore from './useStore';

const useInitFight = () => {
  const { store } = useStore();
  const { reset } = useCharacterMethods();
  let t = null;

  useEffect(() => {
    reset();
    store.enemy.reset();

    t = setTimeout(() => {
      if (store.settings.activeMainScreenTab === MAIN_SCREEN_FIGHT_TAB) {
        store.settings.isFightStarted = true;
      }
    }, 500);

    return () => {
      reset();
      store.enemy.reset();
      clearTimeout(t);
      store.settings.isFightStarted = false;
    };
  }, []);

  return;
};

export default useInitFight;
