import './EnemyAvatar.scss';
import useStore from '../../hooks/useStore';
import useEnemyMethods from '../../hooks/useEnemyMethods';

const EnemyAvatar = ({ className }) => {
  const { assets, fightState } = useStore();
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
