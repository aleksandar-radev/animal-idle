import {
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_AUTO_CAST,
  CHARACTER_SKILL_ASCEND,
  CHARACTER_SKILL_BACKSTAB,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
} from '../constants/gameVariables';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
const Character = (store) => {
  return {
    currentHealth: 0,
    totalHealth: 100,
    currentMana: 0,
    totalMana: 100,
    damage: 15,

    reset() {
      this.currentHealth = this.getTotalHealth();
      this.currentMana = this.getTotalMana();
    },

    getCurrentHealth() {
      return this.currentHealth;
    },

    getTotalHealth() {
      let health = this.totalHealth;
      // TODO: add bonuses
      return health;
    },

    // Mana
    getCurrentMana() {
      return this.currentMana;
    },
    getTotalMana() {
      let mana = this.totalMana;
      // TODO: add bonuses
      return mana;
    },

    // Damage
    getDamage() {
      let damage = this.damage;
      damage +=
        store.data.upgrades[SHOP_UPGRADES_ATACK][SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT].getBonus();

      return damage;
    },

    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    takeDamage(damage) {
      this.currentHealth -= damage;

      if (this.currentHealth <= 0) {
        this.reset();
        store.enemy.reset();
      }
    },

    updateHealth(bonus) {
      const newCurrent = store.character.currentHealth + bonus;
      if (newCurrent >= store.character.getTotalHealth()) {
        store.character.currentHealth = store.character.getTotalHealth();
      } else if (newCurrent < 0) {
        throw new Error('Unable to remove mana');
      } else {
        store.character.currentHealth = newCurrent;
      }
    },

    updateMana(bonus) {
      const newCurrent = store.character.currentMana + bonus;
      if (newCurrent >= store.character.getTotalMana()) {
        store.character.currentMana = store.character.getTotalMana();
      } else {
        store.character.currentMana = newCurrent;
      }
    },

    skills: {
      [CHARACTER_SKILL_ATACK]: {
        name: CHARACTER_SKILL_ATACK,
        cooldown: 500,
        manaCost: 0,
        cast() {
          const damage = store.character.getDamage();
          store.enemy.current.takeDamage(damage);
        },
      },
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldown: 1000,
        manaCost: 0,
        cast() {
          const bonus = store.character.getTotalHealth() / 10;
          store.character.updateHealth(bonus);
        },
      },
      [CHARACTER_SKILL_DOUBLE_DAMAGE]: {
        name: CHARACTER_SKILL_DOUBLE_DAMAGE,
        cooldown: 500,
        manaCost: 10,
        cast() {
          const damage = store.character.getDamage() * 2;
          store.enemy.current.takeDamage(damage);
        },
      },
      [CHARACTER_SKILL_AUTO_CAST]: {
        name: CHARACTER_SKILL_AUTO_CAST,
        cooldown: 10000,
        manaCost: 5,
        cast() {},
      },
      [CHARACTER_SKILL_BACKSTAB]: {
        name: CHARACTER_SKILL_BACKSTAB,
        cooldown: 4000,
        manaCost: 5,
        cast() {
          const damage = store.character.getDamage() * 2;
          store.enemy.current.takeDamage(damage);
        },
      },
      [CHARACTER_SKILL_ASCEND]: {
        name: CHARACTER_SKILL_ASCEND,
        cooldown: 0,
        manaCost: 0,
        cast() {
          // rebirth
        },
      },
    },

    getSkillById(id) {
      const mapping = store.data.skills.map[id];
      return this.skills[mapping];
    },
  };
};

export default Character;
