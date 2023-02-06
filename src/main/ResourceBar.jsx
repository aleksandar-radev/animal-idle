import React, { useState, useEffect } from 'react';
import './ResourceBar.scss';
import api from '../api/Api';

const ResourceBar = () => {
  const [clicks, setClicks] = useState(undefined);

  useEffect(() => {
    api().getTotalClicks(setClicks);
  }, []);

  return (
    <div className={'ResourceBar'}>
      <div className="Random">clicks: {clicks}</div>
    </div>
  );
};

export default ResourceBar;
