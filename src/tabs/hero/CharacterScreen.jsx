import React, { useEffect, useState, useContext } from 'react';
import './CharacterScreen.scss';
import CharacterScreenMenu from './CharacterScreenMenu';
import CharacterAvatar from '../../components/CharacterAvatar';
import CharacterStats from '../../components/CharacterStats';
import CharacterItems from '../../components/CharacterItems';
import CharacterSkills from '../../components/CharacterSkills';
import { Context } from '../../api/Store'

const CharacterScreen = () => {
  const [store, setStore] = useContext(Context);


  const activeTab = () => {
    switch (store.activeCharacaterScreenTab) {
      case 'items':
        return <CharacterItems />
      case 'skills':
        return <CharacterSkills />
      default:
        return <CharacterStats />
    }
  }

  return (
    <div className={'CharacterScreen'}>
      <CharacterScreenMenu></CharacterScreenMenu>
      <CharacterAvatar></CharacterAvatar>
      {activeTab()}

    </div>
  )
}

export default CharacterScreen