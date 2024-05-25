import PropTypes from '../../helpers/externalLibraries/propTypes';
import HealthBar from '../HealthBar';
import './EnemyResources.scss';
import useStore from '../../hooks/useStore';

const EnemyResources = ({ className }) => {
  const { data } = useStore();

  return (
    <div className={['EnemyResources', className].join(' ')}>
      <HealthBar
        currentHealth={data.enemy.current?.getCurrentHealth()}
        totalHealth={data.enemy.current?.getTotalHealth()}></HealthBar>
    </div>
  );
};

export default EnemyResources;
