import { useEffect, useRef } from 'react';
import Data from '@/models/Data';
import Settings from '@/models/Settings';
import useDataRepo from './useDataRepo';
import useAuthRepo from './useAuthRepo';
import useGameStore from './useGameStore';
import FightState from '@/models/FightState';
import { loadAssets } from '@/utils/generalData';

const useDataManager = () => {
  const dataRepo = useDataRepo();
  const authRepo = useAuthRepo();
  const effectCount = useRef(0);

  const { assets, data, isLoaded, setData, setSettings, setIsLoaded, setfightState, updateState } = useGameStore();

  const deepProxy = (obj, handler) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = deepProxy(obj[key], handler);
      }
    }

    return new Proxy(obj, handler);
  };

  const handler = () => ({
    set(target, property, value) {
      // console.log(`${property} changed from ${target[property]} to ${value}`);

      target[property] = value;
      updateState(property, value);
      return true;
    },
  });

  useEffect(() => {
    const handleDatabaseUpdate = async () => {
      if (document.visibilityState === 'visible') {
        const user = await authRepo.getUser();
        dataRepo.updateDataByUserId(user.id, data);
      }
    };

    const interval = setInterval(handleDatabaseUpdate, 60 * 1000);

    document.addEventListener('visibilitychange', handleDatabaseUpdate);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleDatabaseUpdate);
    };
  }, [authRepo, dataRepo, data]);

  useEffect(() => {
    if (effectCount.current > 0) return;
    effectCount.current++;
    loadAssets(assets);

    (async () => {
      const user = await authRepo.getUser();
      if (!user) return;

      let userData = await dataRepo.getDataByUserId(user.id);
      let formattedData = { ...userData.data_json };

      setData(deepProxy(new Data(formattedData), handler()));
      setSettings(deepProxy(new Settings(), handler()));
      setfightState(deepProxy(new FightState({}), handler()));
      setIsLoaded(true);
    })();
  }, []);

  return isLoaded;
};

export default useDataManager;
