import { CHARACTER_TYPE_DRUID } from '../../constants/gameVariables';
import BaseCharacter from './baseCharacter';

const Druid = (store) => {
  const data = {
    name: 'Druid',
    type: CHARACTER_TYPE_DRUID,
  };

  return BaseCharacter(store, data);
};

export default Druid;
