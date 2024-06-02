import HealthBar from '../HealthBar';
import './EnemyResources.scss';
import useStore from '../../hooks/useStore';
import useEnemyMethods from '../../hooks/useEnemyMethods';

const EnemyResources = ({ className }) => {
  const { data } = useStore();
  const em = useEnemyMethods();

  return (
    <>
      {em.getCurrentEnemy() && (
        <div className={['EnemyResources', className].join(' ')}>
          <HealthBar currentHealth={em.getCurrentHealth()} totalHealth={em.getTotalHealth()}></HealthBar>
        </div>
      )}
    </>
  );
};

export default EnemyResources;
