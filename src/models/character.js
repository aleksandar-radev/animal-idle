import { CHARACTER_SKILL_ATACK, CHARACTER_SKILL_HEAL } from '../constants/characterSkillNames';

const Character = (store) => {

  return {
    currentHealth: 55,
    totalHealth: 100,
    currentMana: 100,
    totalMana: 100,
    damage: 5,

    takeDamage () {
      this.currentHealth -= 1;
    },

    skills: {
      [CHARACTER_SKILL_ATACK]: () => {
        const damage = store.character.damage;
        store.enemy.takeDamage(damage);
      },
      [CHARACTER_SKILL_HEAL]: () => {
        store.character.currentHealth += 10;
      },
    },
  };
};

export default Character;