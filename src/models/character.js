import {
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATACK,
  SHOP_UPGRADES_ATACK_BONUS_DAMAGE_FLAT,
} from '../constants/gameVariables';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
const Character = (store) => {
  return {
    currentHealth: 0,
    baseHealth: 100,
    currentMana: 0,
    totalMana: 100,
    damage: 5,

    reset() {
      this.currentHealth = this.getTotalHealth();
      this.currentMana = this.getTotalMana();
    },

    getCurrentHealth() {
      return this.currentHealth;
    },

    getTotalHealth() {
      let health = this.baseHealth;
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

    takeDamage() {
      this.currentHealth -= store.enemy.current.damage;

      if (this.currentHealth <= 0) {
        this.reset();
        store.enemy.reset();
      }
    },

    skills: {
      [CHARACTER_SKILL_ATACK]: {
        name: CHARACTER_SKILL_ATACK,
        cooldown: 500,
        cast() {
          const damage = store.character.getDamage();
          store.enemy.current.takeDamage(damage);
        },
      },
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldown: 500,
        cast() {
          const newCurrent = store.character.currentHealth + store.character.getTotalHealth() / 10;
          if (newCurrent >= store.character.getTotalHealth()) {
            store.character.currentHealth = store.character.getTotalHealth();
          } else {
            store.character.currentHealth = newCurrent;
          }
        },
      },
      [CHARACTER_SKILL_DOUBLE_DAMAGE]: {
        name: CHARACTER_SKILL_DOUBLE_DAMAGE,
        cooldown: 2000,
        cast() {
          store.character.currentMana -= 10;
          const damage = store.character.getDamage() * 2;
          store.enemy.current.takeDamage(damage);
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
