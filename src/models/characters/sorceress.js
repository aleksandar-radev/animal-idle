import { CHARACTER_SKILL_HEAL, CHARACTER_TYPE_SORCERESS } from '../../constants/gameVariables';
import BaseCharacter from './baseCharacter';

const Sorceress = (store) => {
  const data = {
    name: 'Sorceress',
    type: CHARACTER_TYPE_SORCERESS,
    health: 200,
    damage: 7,
    attackSpeed: 1000,
    skills: {
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldown: 1000 * 60,
        manaCost: 0,
        cast() {
          let damage = store.character.getDamage();
          store.enemy.current.takeDamage(damage);
        },
      },
    },
  };

  return BaseCharacter(store, data);
};

export default Sorceress;
