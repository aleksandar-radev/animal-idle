import { useContext } from 'react';
import { State } from '../../api/Store';
import PropTypes from '../../externalLibraries/propTypes';

const EnemyAvatar = ({ className }) => {
  const [store] = useContext(State);
  return <div className={className}>EnemyAvatar LVL: {store.data?.enemy?.level || 0}</div>;
};

EnemyAvatar.propTypes = {
  className: PropTypes.string,
};

export default EnemyAvatar;
