import React from 'react';
import './CharacterUpgrades.scss';
import useStore from '../../hooks/useStore';

const CharacterUpgrades = () => {
  const { store } = useStore();
  console.log(store);

  return (
    <div className="CharacterUpgrades">
      <div className="attack">asdf</div>
      <div className="defense">asdf</div>
      <div className="utility">asdf</div>
    </div>
  );
};

export default CharacterUpgrades;
