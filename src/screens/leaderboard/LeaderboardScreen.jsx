import { useContext } from 'react';
import { State } from '../../api/Store';
import './LeaderboardScreen.scss';

const LeaderboardScreen = () => {
  const [store] = useContext(State);

  return <div className={'LeaderboardScreen'}>Leaderboard</div>;
};

export default LeaderboardScreen;
