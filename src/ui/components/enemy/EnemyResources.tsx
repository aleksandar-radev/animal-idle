import './EnemyResources.scss';
import useStore from '@/hooks/useStore';
import useEnemyMethods from '@/hooks/useEnemyMethods';
import HealthBar from '@/ui/components/HealthBar';

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
