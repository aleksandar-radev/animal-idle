import { useEffect, useState } from 'react';
import './LeaderboardScreen.scss';
import useTranslations from '@/hooks/general/useTranslations';
import useDataRepo from '@/hooks/general/useDataRepo';

const LeaderboardScreen = () => {
  const [allData, setAllData] = useState([]);
  const dataRepo = useDataRepo();
  const t = useTranslations();

  useEffect(() => {
    dataRepo.getLeaderboard().then((data) => {
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
              <tr key={data.user.email}>
                <td>{i + 1}</td>
                <td>{data.user.email}</td>
                <td>{data.highest_level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardScreen;
