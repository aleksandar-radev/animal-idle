import { CHARACTER_SKILL_ATACK, CHARACTER_SKILL_DOUBLE_DAMAGE, CHARACTER_SKILL_HEAL } from '../constants/characterSkillNames';

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
      [CHARACTER_SKILL_ATACK]: {
        name: CHARACTER_SKILL_ATACK,
        cooldown: 2000,
        cast () {
          const damage = store.character.damage;
          store.enemy.takeDamage(damage);
        }
      },
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldown: 500,
        cast () {
          store.character.currentHealth += 10;
        }
      },
      [CHARACTER_SKILL_DOUBLE_DAMAGE]: {
        name: CHARACTER_SKILL_DOUBLE_DAMAGE,
        cooldown: 2000,
        cast () {
          const damage = store.character.damage * 2;
          store.enemy.takeDamage(damage);
        }

      },
    },

    skillsMap: {
      '1': CHARACTER_SKILL_ATACK,
      '2': CHARACTER_SKILL_HEAL,
      '3': CHARACTER_SKILL_DOUBLE_DAMAGE,
    },

    getSkillById (id) {
      const mapping = this.skillsMap[id];
      return this.skills[mapping];
    }
  };
};

export default Character;


