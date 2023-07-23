import { useEffect, useState } from 'react';
import './LeaderboardScreen.scss';
import { DataRepo } from '../../api/DataRepo';
import useTranslations from '../../hooks/useTranslations';

const LeaderboardScreen = () => {
  const [allData, setAllData] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    DataRepo.getAllScores().then((data) => {
      setAllData(data);
    });
  }, []);

  return (
    <div className={'LeaderboardScreen'}>
      <table>
        <thead>
          <tr>
            <th>{t.rank}</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((data, i) => {
            return (
              <tr key={data.user_id}>
                <td>{i + 1}</td>
                <td>{data.users.user_email}</td>
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
