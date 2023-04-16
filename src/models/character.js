import {
  CHARACTER_SKILL_ATACK,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
} from '../constants/gameVariables';

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

    // Health
    getCurrentHealth() {
      return this.currentHealth;
    },

    getTotalHealth() {
      let health = this.baseHealth;
      health += store.data.character.bonusHealthFlat;
      health *= store.data.character.bonusHealthPercent;
      return health;
    },

    // Mana
    getCurrentMana() {
      return this.currentMana;
    },
    getTotalMana() {
      let mana = this.totalMana;
      mana += store.data.character.bonusManaFlat;
      mana *= store.data.character.bonusManaPercent;
      return mana;
    },

    // Damage
    getDamage() {
      let damage = this.damage;
      damage += store.data.character.bonusDamageFlat;
      damage *= store.data.character.bonusDamagePercent;
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
    },

    addCurrency(currency, amount) {
      store.data.currencies[currency] += amount;
      // this.renderChange();
    },

    getCurrency(currency) {
      return store.data.currencies[currency];
      // this.renderChange();
    },

    removeCurrency(currency, amount) {
      this.currencies[currency] -= amount;
      this.renderChange();
    },

    skills: {
      [CHARACTER_SKILL_ATACK]: {
        name: CHARACTER_SKILL_ATACK,
        cooldown: 2000,
        cast() {
          const damage = store.character.damage;
          store.enemy.current.takeDamage(damage);
        },
      },
      [CHARACTER_SKILL_HEAL]: {
        name: CHARACTER_SKILL_HEAL,
        cooldown: 500,
        cast() {
          store.character.currentHealth += 10;
        },
      },
      [CHARACTER_SKILL_DOUBLE_DAMAGE]: {
        name: CHARACTER_SKILL_DOUBLE_DAMAGE,
        cooldown: 2000,
        cast() {
          const damage = store.character.damage * 10;
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
