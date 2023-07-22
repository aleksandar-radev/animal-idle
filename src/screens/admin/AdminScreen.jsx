import { useEffect, useState } from 'react';
import { DataRepo } from '../../api/DataRepo';
import './AdminScreen.scss';
import UserDataDisplay from './UserDataDisplay';

const AdminScreen = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    DataRepo.getAllData().then((data) => {
      console.log(data);
      setAllData(data);
    });
  }, []);

  return (
    <div className={'AdminScreen'}>
      {allData.map((item) => {
        return <UserDataDisplay key={item.user} {...item}></UserDataDisplay>;
      })}
    </div>
  );
};

export default AdminScreen;
