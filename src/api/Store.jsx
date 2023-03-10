import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { CHARACTER_SCREEN_STATS_TAB, MAIN_SCREEN_CHARACTER_TAB } from './tabs';

const initialState = {
  tabs: {
    activeMainScreenTab: MAIN_SCREEN_CHARACTER_TAB,
    activeCharacterScreenTab: CHARACTER_SCREEN_STATS_TAB,
  },
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
