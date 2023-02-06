import React, { useEffect, useState } from 'react';
import { ref, onValue, set } from 'firebase/database';
import api from '../api/Api';
import './Random.scss';

const Random = () => {
  // const [state, setState] = useContext(Context)
  const [clicks, setClicks] = useState(undefined);

  useEffect(() => {
    api().getTotalClicks(setClicks);
  }, []);

  const addCount = () => {
    if (!clicks) return;
    set(ref(api().database, 'totalVisits'), clicks + 1);
  };

  return (
    <>
      <button onClick={addCount} className="Random">
        total clicks: {clicks} Okayyy xD
      </button>
    </>
  );
};

export default Random;
