import { useContext, useEffect } from 'react';
import useCharacterMethods from './useCharacterMethods';
import { State } from '../api/Store';
import { MAIN_SCREEN_FIGHT_TAB } from '../constants/gameVariables';

const useInitFight = () => {
  const [store] = useContext(State);
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
