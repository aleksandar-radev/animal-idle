import HealthBar from '../HealthBar';
import './EnemyResources.scss';
import useStore from '../../hooks/useStore';
import useEnemyMethods from '../../hooks/useEnemyMethods';

const EnemyResources = ({ className }) => {
  const { data } = useStore();
  const enemy = useEnemyMethods();

  return (
    <>
      {enemy.getCurrentEnemy() && (
        <div className={['EnemyResources', className].join(' ')}>
          <HealthBar currentHealth={enemy.getCurrentHealth()} totalHealth={enemy.getTotalHealth()}></HealthBar>
        </div>
      )}
    </>
  );
};

export default EnemyResources;
