import React, { useContext, useEffect } from 'react'
import "./MainMenu.scss"
import { Context } from '../Store'


const MainMenu = () => {

  const [store, setStore] = useContext(Context)

  const changeView = (view) => {
    setStore({...store, activeTab: view})
  }

  return (
    <div className={'MainMenu'}>
      <div onClick={() => changeView('shop')}>Shop</div>
      <div onClick={() => changeView('fight')}>Fight</div>
    </div>
  )
}

export default MainMenu