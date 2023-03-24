import { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';
import { State } from '../api/Store';
import Character from './character';
import Enemy from './enemy';
import Tabs from './tabs';

const ModelManager = () => {
  const [store, setStore] = useContext(State);
  const effectCount = useRef(0);
  const navigate = useNavigate();

  const handler = {
    set(target, property, value) {
      api.auth.refreshSession().then((session) => {
        if (session.error) {
          api.auth.signOut();
          navigate('/login');
        }
      });

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
