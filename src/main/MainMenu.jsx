import React, { useContext, useEffect } from 'react';
import './MainMenu.scss';
import { Context } from '../api/Store';

const MainMenu = () => {
  const [store, setStore] = useContext(Context);

  const changeView = (view) => {
    setStore({ ...store, activeTab: view });
  };

  return (
    <div className={'MainMenu'}>
      <div onClick={() => changeView('character')}>Character</div>
      <div onClick={() => changeView('fight')}>Fight</div>
      <div onClick={() => changeView('shop')}>shop</div>
    </div>
  );
};

export default MainMenu;
