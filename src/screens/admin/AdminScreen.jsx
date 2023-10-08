import { useEffect, useState } from 'react';
import { DataRepo } from '../../api/DataRepo';
import './AdminScreen.scss';
import UserDataDisplay from './UserDataDisplay';

const AdminScreen = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    DataRepo.getAllData().then((data) => {
      setAllData(data);
    });
  }, []);

  return (
    <div className={'AdminScreen'}>
      {allData.map((item) => {
        return <UserDataDisplay key={item.user.id} {...item}></UserDataDisplay>;
      })}
    </div>
  );
};

export default AdminScreen;
