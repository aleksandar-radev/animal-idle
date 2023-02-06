import React, { useContext } from 'react'
import './CharacterScreenMenu.scss'
import { Context } from '../../api/Store'

const CharacterScreenMenu = () => {

  const [store, setStore] = useContext(Context)

  
  const changeView = (view) => {
    setStore({ ...store, activeCharacaterScreenTab: view })
  }


  return (
    <div className={'CharacterScreenMenu'}>
      <div onClick={() => changeView('stats')}>Stats</div>
      <div onClick={() => changeView('skills')}>Skills</div>
      <div onClick={() => changeView('items')}>Items</div>
    </div>
  )
}

export default CharacterScreenMenu