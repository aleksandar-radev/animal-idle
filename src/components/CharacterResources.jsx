import React, { useContext, useState } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './CharacterResources.scss';
import HealthBar from './HealthBar';
import ManaBar from './ManaBar';

const CharacterResources = (props) => {
  const [store, setStore] = useContext(State);
  const [enemy, setEnemy] = useState(store.enemy);

  console.log(enemy);
  return (
    <div className={['CharacterResources', props.className].join(' ')}>
      <HealthBar currentHealth={enemy.currentHealth} totalHealth={enemy.totalHealth}></HealthBar>

      {props.isSelf ? <ManaBar></ManaBar> : null}
    </div>
  );
};

CharacterResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default CharacterResources;
