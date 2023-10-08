import { useContext, useEffect, useRef } from 'react';
import { State } from '../api/Store';
import PropTypes from '../externalLibraries/propTypes';
import './ManaBar.scss';

const ManaBar = ({ currentMana, totalMana }) => {
  const [store] = useContext(State);
  const shouldStopRegen = useRef(false);
  const percentage = (currentMana / totalMana) * 100;

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
        store.character.updateMana(1);
        regenMana();
      }
    };
    requestAnimationFrame(animateCooldown);
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(50, 50, 255, 0.8) ${percentage}%, rgba(255, 255, 255, 0.5) ${percentage}%)`,
      }}
      className={'ManaBar'}>{`${currentMana} / ${totalMana}`}</div>
  );
};

ManaBar.propTypes = {
  currentMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalMana: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ManaBar;
