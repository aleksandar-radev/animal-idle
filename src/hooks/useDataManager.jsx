import { useContext, useEffect, useRef, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';
import { mergeObjectsRecursive } from '../helpers/functions';
import Characters from '../models/characters';
import Data from '../models/data';
import Enemy from '../models/enemy';
import Settings from '../models/settings';
import { loadAssets } from '../models/assetsLoader';

const useDataManager = () => {
  const [store, setStore] = useContext(State);
  const effectCount = useRef(0);
  let [isLoaded, setisLoaded] = useState(false);

  const handler = {
    set(target, property, value) {
      // console.log(`${property} changed from ${target[property]} to ${value}`);
      target[property] = value;
      setStore({ ...store });
      return true;
    },
  };

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        const user = await AuthRepo.getUser();
        DataRepo.updateDataById(user.id, store.data);
      }
    };

    setInterval(handleVisibilityChange, 60 * 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(handleVisibilityChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (effectCount.current > 0) return;
    effectCount.current++;
    store.assets = {};
    loadAssets(store);

    (async () => {
      const user = await AuthRepo.getUser();
      if (!user) return;
      let data = await DataRepo.getDataById(user.id);

      if (!data) {
        await DataRepo.insertDataById(user.id, {});
        data = {};
      }

      // !IMPORTANT data has to be first, because others are evaluated based on it
      store.data = new Proxy(mergeObjectsRecursive(Data(store), data), handler);

      store.settings = new Proxy({ ...Settings(store) }, handler);

      store.characters = new Proxy({ ...Characters(store) }, handler);

      store.enemy = new Proxy({ ...Enemy(store) }, handler);
      // store.enemy.reset();

      setStore({ ...store });
      setisLoaded(true);
    })();
  }, []);

  return isLoaded;
};

export default useDataManager;
