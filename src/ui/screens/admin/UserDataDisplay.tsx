import { useRef } from 'react';
import './UserDataDisplay.scss';
import useDataRepo from '@/hooks/general/useDataRepo';

const UserDataDisplay = (item) => {
  const areaVal = useRef(null);
  const dataRepo = useDataRepo();

  const handleSave = () => {
    dataRepo.updateDataByUserId(item.user.id, JSON.parse(areaVal.current?.value || '{}'));
  };

  return (
    <>
      <div key={item.user} className="UserDataDisplay">
        <p>
          <mark>{item.user.email}</mark>
        </p>
        <textarea ref={areaVal} defaultValue={JSON.stringify(item.data, null, 4)}></textarea>
        <button className="save" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default UserDataDisplay;
