import { useEffect, useRef } from 'react';
import Data from '../models/Data';
import Settings from '../models/Settings';
import { loadAssets } from '../helpers/gameFunctions';
import useDataRepo from './useDataRepo';
import useAuthRepo from './useAuthRepo';
import useStore from './useStore';
import GameState from '../models/GameState';

const useDataManager = () => {
  const dataRepo = useDataRepo();
  const authRepo = useAuthRepo();
  const effectCount = useRef(0);

  const { assets, data, isLoaded, setData, setSettings, setIsLoaded, setGameState, updateState } = useStore();

  const handler = () => ({
    set(target, property, value) {
      console.log(`${property} changed from ${target[property]} to ${value}`);

      target[property] = value;
      updateState(property, value);
      return true;
    },
  });

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        const user = await authRepo.getUser();
        dataRepo.updateDataByUserIdAndPremium(user.id, data);
      }
    };

    const interval = setInterval(handleVisibilityChange, 60 * 1000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authRepo, dataRepo, data]);

  useEffect(() => {
    if (effectCount.current > 0) return;
    effectCount.current++;
    loadAssets(assets);

    (async () => {
      const user = await authRepo.getUser();
      if (!user) return;

      let data = await dataRepo.getDataByUserId(user.id);
      q(data);
      let formattedData = { ...data, ...data.json_data };

      q(formattedData);
      setData(new Proxy(new Data(formattedData), handler()));
      setSettings(new Proxy(new Settings({}), handler()));
      setGameState(new Proxy(new GameState({}), handler()));
      setIsLoaded(true);
    })();
  }, []);

  return isLoaded;
};

export default useDataManager;
