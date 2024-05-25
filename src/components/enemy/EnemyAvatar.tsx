import PropTypes from '../../helpers/externalLibraries/propTypes';
import './EnemyAvatar.scss';
import useStore from '../../hooks/useStore';

const EnemyAvatar = ({ className }) => {
  const { data, assets } = useStore();
  const avatar = assets[data.enemy.current.name];
  return (
    <div className={`${className} EnemyAvatar`}>
      <p className={`EnemyAvatar-text`}>
        {data.enemy.current.name} Lvl: {data.enemy.level || 0}
      </p>
      <div className={`EnemyAvatar-image`}>
        <img src={avatar} />
      </div>
    </div>
  );
};

export default EnemyAvatar;
