import React, { useContext, useEffect, useRef } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './ManaBar.scss';

const ManaBar = (props) => {
  const [store] = useContext(State);
  const shouldStopRegen = useRef(false);

  useEffect(() => {
    shouldStopRegen.current = false;
    return () => {
      shouldStopRegen.current = true;
    };
  }, []);

  useEffect(() => {
    regenMana();
  }, []);

  function regenMana() {
    let startTime = null;

    const animateCooldown = (timestamp) => {
      if (shouldStopRegen.current) return;
      if (!startTime) {
        startTime = timestamp;
      }
      if (timestamp - startTime < 2000) {
        requestAnimationFrame(animateCooldown);
      } else {
        store.character.currentMana++;
        regenMana();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return <div className={'ManaBar'}>{`${props.currentMana} / ${props.totalMana}`}</div>;
};

ManaBar.propTypes = {
  currentMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ManaBar;
