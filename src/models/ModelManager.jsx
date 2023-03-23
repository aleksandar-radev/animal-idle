import { useContext, useEffect, useRef } from 'react';
import { State } from '../api/Store';
import Character from './character';
import Enemy from './enemy';
import Tabs from './tabs';

const ModelManager = () => {
  const [store, setStore] = useContext(State);
  const effectCount = useRef(0);

  const handler = {
    set(target, property, value) {
      console.log(`${property} changed from ${target[property]} to ${value}`);
      target[property] = value;
      setStore({ ...store });
      return true;
    },
  };

  useEffect(() => {
    if (effectCount.current > 1) return;
    effectCount.current++;

    store.tabs = new Proxy({ ...Tabs(store) }, handler);
    store.character = new Proxy({ ...Character(store) }, handler);
    store.enemy = new Proxy({ ...Enemy(store) }, handler);
  }, [store]);

  useEffect(() => {
    setStore({});
  }, []);

  return;
};

export default ModelManager;
