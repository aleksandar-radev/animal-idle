import PropTypes from '../../externalLibraries/propTypes';
import './EnemyAvatar.scss';
import useStore from '../../hooks/useStore';

const EnemyAvatar = ({ className }) => {
  const { store } = useStore();
  const avatar = store.assets[store.enemy.current?.name];
  return (
    <div className={`${className} EnemyAvatar`}>
      <p className={`EnemyAvatar-text`}>
        {store.enemy.current?.name} Lvl: {store.data?.enemy?.level || 0}
      </p>
      <div className={`EnemyAvatar-image`}>
        <img src={avatar} />
      </div>
    </div>
  );
};

EnemyAvatar.propTypes = {
  className: PropTypes.string,
};

export default EnemyAvatar;
