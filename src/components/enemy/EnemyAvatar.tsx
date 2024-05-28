import './EnemyAvatar.scss';
import useStore from '../../hooks/useStore';
import useEnemyMethods from '../../hooks/useEnemyMethods';

const EnemyAvatar = ({ className }) => {
  const { assets } = useStore();
  const enemy = useEnemyMethods();
  return (
    <>
      {enemy.getCurrentEnemy() && (
        <div className={`${className} EnemyAvatar`}>
          <p className={`EnemyAvatar-text`}>
            {enemy.getCurrentEnemyName()} Lvl: {enemy.getLevel() || 0}
          </p>
          <div className={`EnemyAvatar-image`}>
            <img src={assets[enemy.getCurrentEnemyName()]} />
          </div>
        </div>
      )}
    </>
  );
};

export default EnemyAvatar;
