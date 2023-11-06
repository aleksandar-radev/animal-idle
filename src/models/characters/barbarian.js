import { CHARACTER_SKILL_ATTACK, CHARACTER_TYPE_BARBARIAN } from '../../constants/gameVariables';
import BaseCharacter from './baseCharacter';

const Barbarian = (store) => {
  const data = {
    name: 'Barbarian',
    type: CHARACTER_TYPE_BARBARIAN,
    health: 200,
    damage: 70,
    attackSpeed: 5000,
    skills: {
      [CHARACTER_SKILL_ATTACK]: {
        name: CHARACTER_SKILL_ATTACK,
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

export default Barbarian;
