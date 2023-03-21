import React, { useState } from 'react';
import PropTypes from '../externalLibraries/propTypes';
import enemy from './stateModels/enemy';
import tabs from './stateModels/tabs';

const initialState = {
  tabs,
  enemy,
};

export const State = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);

  return <State.Provider value={[state, setState]}>{children}</State.Provider>;
};

Store.propTypes = {
  children: PropTypes.any,
};

export default Store;
