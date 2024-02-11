import { useContext } from 'react';
import { State } from '../api/Store';
const useStore = () => {
  const [store] = useContext(State);

  return {
    store,
  };
};

export default useStore;
