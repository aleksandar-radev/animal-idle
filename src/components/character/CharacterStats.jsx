import { useContext } from 'react';
import { State } from '../../api/Store';

const CharacterStats = () => {
  const [store] = useContext(State);
  const attack = store.character.getDamage();
  return (
    <div className="CharacterStats">
      <div> Attack: {attack}</div>
    </div>
  );
};

export default CharacterStats;
