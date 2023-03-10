import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CHARACTER_SCREEN_STATS_TAB, MAIN_SCREEN_CHARACTER_TAB } from './tabs';

const initialState = {
  activeMainScreenTab: MAIN_SCREEN_CHARACTER_TAB,
  activeCharacterScreenTab: CHARACTER_SCREEN_STATS_TAB,
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
