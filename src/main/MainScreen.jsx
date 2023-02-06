import React, { useEffect, useState, useContext } from 'react';
import { ref, set } from "firebase/database";
import api from "../api/Api";
import "./MainScreen.scss";
import CharacterScreen from '../tabs/hero/CharacterScreen';
import FightScreen from '../tabs/fight/FightScreen';
import Shop from '../tabs/shop/Shop';
import { Context } from '../api/Store'


const MainScreen = () => {
  const [clicks, setClicks] = useState(undefined)
  const [store, setStore] = useContext(Context);


  useEffect(() => {
    api().getTotalClicks(setClicks);
  }, []);

  // const addCount = () => {
  //   if (!clicks) return;
  //   set(ref(api().database, 'totalVisits'), clicks + 1);
  // }

  const activeTab = () => {
    switch (store.activeTab) {
      case 'fight':
        return <FightScreen />
      case 'shop':
        return <Shop />
      case 'character':
        return <CharacterScreen />
      default:
        return <CharacterScreen />
    }
  }

  return (
    <div className={'MainScreen'}>
      {/* <div onClick={addCount} className="MainScreen-button">
        Add clicks
      </div> */}
      {activeTab()}

    </div>
  )
}

export default MainScreen