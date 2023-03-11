import React, { useContext, useEffect, useState } from 'react';
import { AuthRepo } from '../api/AuthRepo';
import { ResourcesRepo } from '../api/ResourcesRepo';
import { State } from '../api/Store';

import './ResourceBar.scss';

const ResourceBar = () => {
  const [resources, setResources] = useState(undefined);
  const [state] = useContext(State);

  useEffect(() => {
    (async () => {
      const user = await AuthRepo.getUser();
      const res = await ResourcesRepo.getResources(user.id);

      console.log(res);
      setResources(res);
    })();
  }, []);

  const addGold = async () => {
    const res = await ResourcesRepo.updateResources(resources);
    console.log(res);
    setResources(res);
  };
  return (
    <div className={'ResourceBar'}>
      <div className="Random">Gold: {resources?.gold}</div>
      <button onClick={addGold}>Add Gold</button>
    </div>
  );
};

export default ResourceBar;
