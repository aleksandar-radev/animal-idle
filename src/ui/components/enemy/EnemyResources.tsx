import './EnemyResources.scss';
import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';
import useGameStore from '@/hooks/general/useGameStore';
import HealthBar from '@/ui/components/HealthBar';

const EnemyResources = ({ className }) => {
  const { data } = useGameStore();
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
