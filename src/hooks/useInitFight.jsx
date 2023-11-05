import { useContext, useEffect } from 'react';
import { State } from '../api/Store';

const useInitFight = () => {
  const [store] = useContext(State);

  useEffect(() => {
    store.characters.reset();
    return () => {};
  }, []);

  return;
};

export default useInitFight;
