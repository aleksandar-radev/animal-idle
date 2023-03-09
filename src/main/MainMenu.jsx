import React, { useContext } from 'react';
import './MainMenu.scss';
import { Context } from '../api/Store';
import { AuthRepo } from '../api/AuthRepo';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const [store, setStore] = useContext(Context);
  const navigate = useNavigate();

  const changeView = (view) => {
    setStore({ ...store, activeTab: view });
  };
  const logout = async () => {
    navigate('/login');
    await AuthRepo.signOut();
  };

  return (
    <div className={'MainMenu'}>
      <div onClick={() => changeView('character')}>Character</div>
      <div onClick={() => changeView('fight')}>Fight</div>
      <div onClick={() => changeView('shop')}>shop</div>
      <div className="MainMenu-logout" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default MainMenu;
