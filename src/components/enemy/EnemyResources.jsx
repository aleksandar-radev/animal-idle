import { useContext } from 'react';
import { State } from '../../api/Store';
import PropTypes from '../../externalLibraries/propTypes';
import HealthBar from '../HealthBar';
import './EnemyResources.scss';

const EnemyResources = ({ className }) => {
  const [store] = useContext(State);

  return (
    <div className={['EnemyResources', className].join(' ')}>
      <HealthBar
        currentHealth={store.enemy.current?.getCurrentHealth()}
        totalHealth={store.enemy.current?.getTotalHealth()}></HealthBar>
    </div>
  );
};

EnemyResources.propTypes = {
  isSelf: PropTypes.bool,
  className: PropTypes.string,
};

export default EnemyResources;
