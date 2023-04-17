import { useContext, useEffect, useRef } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';
import { mergeObjectsRecursive } from '../helpers/functions';
import Character from './character';
import Data from './data';
import Enemy from './enemy';
import Tabs from './tabs';

const DataManager = () => {
  const [store, setStore] = useContext(State);
  const effectCount = useRef(0);

  const handler = {
    set(target, property, value) {
      // console.log(`${property} changed from ${target[property]} to ${value}`);
      target[property] = value;
      setStore({ ...store });
      return true;
    },
  };

  useEffect(() => {
    setInterval(async () => {
      const user = await AuthRepo.getUser();
      DataRepo.updateDataById(user.id, store.data);
    }, 60 * 1000);
  }, []);

  useEffect(() => {
    if (effectCount.current > 0) return;
    effectCount.current++;

    (async () => {
      const user = await AuthRepo.getUser();
      let data = await DataRepo.getDataById(user.id);

      if (!data) {
        data = await DataRepo.insertDataById(user.id, {});
      }

      // data has to be first, because others are evaluated based on it

      store.data = new Proxy(mergeObjectsRecursive(Data(store), data), handler);

      store.tabs = new Proxy({ ...Tabs(store) }, handler);

      store.character = new Proxy({ ...Character(store) }, handler);
      store.character.reset();

      store.enemy = new Proxy({ ...Enemy(store) }, handler);
      store.enemy.reset();

      setStore({ ...store });
    })();
  }, []);

  return;
};

export default DataManager;
