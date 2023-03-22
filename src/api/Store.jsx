import React, { useState } from 'react';
import PropTypes from '../externalLibraries/propTypes';
import character from '../models/character';
import enemy from '../models/enemy';
import tabs from '../models/tabs';

const initialState = {
  tabs,
  enemy,
  character,
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
