import { useEffect, useState } from 'react';
import './AdminScreen.scss';
import UserDataDisplay from './UserDataDisplay';
import useDataRepo from '../../hooks/useDataRepo';

const AdminScreen = () => {
  const [allData, setAllData] = useState([]);
  const dataRepo = useDataRepo();

  useEffect(() => {
    dataRepo.getAllData().then((data) => {
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
