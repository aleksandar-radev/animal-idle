import { useContext } from 'react';
import { State } from '../../api/Store';

const CharacterStats = () => {
  const [store] = useContext(State);
  const atack = store.character.getDamage();
  return (
    <div className="CharacterStats">
      <div> Atack: {atack}</div>
    </div>
  );
};

export default CharacterStats;
