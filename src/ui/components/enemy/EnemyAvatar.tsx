import useEnemyMethods from '@/hooks/gameMethods/useEnemyMethods';
import './EnemyAvatar.scss';
import useGameStore from '@/hooks/general/useGameStore';

const EnemyAvatar = ({ className }) => {
  const { assets, fightState } = useGameStore();
  const em = useEnemyMethods();
  return (
    <>
      {em.getCurrentEnemy() && (
        <div className={`${className} EnemyAvatar`}>
          <p className={`EnemyAvatar-text`}>
            {em.getCurrentEnemyName()} Lvl: {fightState.enemyLevel}
          </p>
          <div className={`EnemyAvatar-image`}>
            <img src={assets[em.getCurrentEnemyName()]} />
          </div>
        </div>
      )}
    </>
  );
};

export default EnemyAvatar;
