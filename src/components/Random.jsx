import React, { useEffect, useState, useContext } from 'react';
import './Random.scss';
import { Context } from '../api/Store';

const Random = () => {
  const [store, setStore] = useContext(Context);
  const [clicks, setClicks] = useState(undefined);

  useEffect(() => {}, []);

  const addCount = () => {};

  return (
    <>
      <button onClick={addCount} className="Random">
        total clicks: {clicks} Okayyy xD
      </button>
    </>
  );
};

export default Random;
