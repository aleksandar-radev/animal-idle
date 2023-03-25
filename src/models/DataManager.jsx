import { useContext, useEffect, useRef } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { DataRepo } from '../api/DataRepo';
import { State } from '../api/Store';
import Character from './character';
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
    if (effectCount.current > 0) return;
    effectCount.current++;

    (async () => {
      const user = await AuthRepo.getUser();
      let data = await DataRepo.getDataById(user.id);

      if (!data) {
        data = await DataRepo.insertDataById(user.id, {});
      }

      store.tabs = new Proxy({ ...Tabs(store), ...data.tabs }, handler);
      store.character = new Proxy({ ...Character(store) }, handler);
      store.enemy = new Proxy({ ...Enemy(store) }, handler);

      setStore({ ...store });
    })();
  }, []);

  return;
};

export default DataManager;
