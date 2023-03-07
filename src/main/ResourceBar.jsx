import React, { useState, useEffect } from 'react';
import './ResourceBar.scss';

const ResourceBar = () => {
  const [clicks, setClicks] = useState(undefined);

  useEffect(() => {}, []);

  return (
    <div className={'ResourceBar'}>
      <div className="Random">clicks: {clicks}</div>
    </div>
  );
};

export default ResourceBar;
