import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  activeTab: '',
  activeCharacterScreenMenuTab: '',
  isRegister: false,
};

export const Context = React.createContext();

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

Store.propTypes = {
  children: PropTypes.any,
};

export default Store;
