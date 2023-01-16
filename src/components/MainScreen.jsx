import React, { useEffect, useState } from 'react';
import { ref, set } from "firebase/database";
import api from "../api/Api";
import "./MainScreen.scss";


const MainScreen = () => {
  const [clicks, setClicks] = useState(undefined)


  useEffect(() => {
    api().getTotalClicks(setClicks);
  }, []);

  const addCount = () => {
    if (!clicks) return;
    set(ref(api().database, 'totalVisits'), clicks + 1);

  }

  return (
    <div className={'MainScreen'}>
      <div onClick={addCount} className="MainScreen-button">
        Add clicks
      </div>
    </div>
  )
}

export default MainScreen