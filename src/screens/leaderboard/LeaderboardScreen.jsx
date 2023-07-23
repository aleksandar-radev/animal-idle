import { useEffect, useState } from 'react';
import './LeaderboardScreen.scss';
import { DataRepo } from '../../api/DataRepo';

const LeaderboardScreen = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    DataRepo.getAllScores().then((data) => {
      console.log(data);
      setAllData(data);
    });
  }, []);

  return (
    <div className={'LeaderboardScreen'}>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((data, i) => {
            console.log(data);
            return (
              <tr key={data.user_id}>
                <td>{i + 1}</td>
                <td>{data.animal_idle_users.user_email}</td>
                <td>{data.enemy_level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardScreen;
