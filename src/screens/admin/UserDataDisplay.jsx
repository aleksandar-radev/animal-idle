import { useRef } from 'react';
import { DataRepo } from '../../api/DataRepo';
import './UserDataDisplay.scss';

const UserDataDisplay = (item) => {
  const areaVal = useRef();

  const handleSave = () => {
    DataRepo.updateDataById(item.user.id, JSON.parse(areaVal.current.value));
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
