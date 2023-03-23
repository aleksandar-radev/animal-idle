import React, { useState } from 'react';
import PropTypes from '../externalLibraries/propTypes';

export const State = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState({});

  return <State.Provider value={[state, setState]}>{children}</State.Provider>;
};

Store.propTypes = {
  children: PropTypes.any,
};

export default Store;
