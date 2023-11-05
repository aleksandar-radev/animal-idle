import { CHARACTER_TYPE_SORCERESS } from '../../constants/gameVariables';
import BaseCharacter from './baseCharacter';

const Sorceress = (store) => {
  const data = {
    name: 'Sorceress',
    type: CHARACTER_TYPE_SORCERESS,
  };

  return BaseCharacter(store, data);
};

export default Sorceress;
