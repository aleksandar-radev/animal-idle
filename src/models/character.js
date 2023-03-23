import { CHARACTER_SKILL_ATACK, CHARACTER_SKILL_HEAL } from "../constants/characterSkillNames";

const character = {
  _currentHealth: 55,
  _totalHealth: 100,
  _currentMana: 100,
  _totalMana: 100,
  _damage: 5,

  get currentHealth () {
    return this._currentHealth;
  },

  set currentHealth (amount) {
    if (amount >= this.totalHealth) {
      this._currentHealth = this.totalHealth;
    } else {
      this._currentHealth = amount;
    }
  },

  get totalHealth () {
    return this._totalHealth;
  },

  get currentMana () {
    return this._currentMana;
  },

  set currentMana (amount) {
    if (amount >= this.totalMana) {
      this._currentMana = this.totalMana;
    } else {
      this._currentMana = amount;
    }
  },

  get totalMana () {
    return this._totalMana;
  },

  get damage () {
    return this._damage;
  },

  skills: {
    [CHARACTER_SKILL_ATACK]: (store) => {
      store.enemy.currentHealth -= store.character.damage;
    },
    [CHARACTER_SKILL_HEAL]: (store) => {
      store.character.currentHealth += 10;
    }
  }
}

export default character;