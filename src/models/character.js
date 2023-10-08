import {
  CHARACTER_SKILL_ATTACK,
  CHARACTER_SKILL_AUTO_CAST,
  CHARACTER_SKILL_ASCEND,
  CHARACTER_SKILL_BACKSTAB,
  CHARACTER_SKILL_DOUBLE_DAMAGE,
  CHARACTER_SKILL_HEAL,
  SHOP_UPGRADES_ATTACK,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT,
  SHOP_UPGRADES_ATTACK_CRIT_CHANCE,
  SHOP_UPGRADES_ATTACK_CRIT_DAMAGE,
  SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE,
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_SORCERESS,
  CHARACTER_TYPE_DRUID,
} from '../constants/gameVariables';
import { getRandomNumber } from '../helpers/functions';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
const Character = (store) => {
  return {
    characters: {
      [CHARACTER_TYPE_BARBARIAN]: {
        name: 'Barbarian',
        type: CHARACTER_TYPE_BARBARIAN,
      },
      [CHARACTER_TYPE_SORCERESS]: {
        name: 'Sorceress',
        type: CHARACTER_TYPE_SORCERESS,
      },
      [CHARACTER_TYPE_DRUID]: {
        name: 'Druid',
        type: CHARACTER_TYPE_DRUID,
      },
    },
    currentHealth: 0,
    totalHealth: 100,
    currentMana: 0,
    totalMana: 100,
    damage: 15,
    attackSpeed: 0,
    critChance: 1,
    critDamage: 0,
    doubleDamageChance: 0,

    getAllStats() {
      return {
        totalHealth: this.getTotalHealth(),
        totalMana: this.getTotalMana(),
        damage: this.getBaseDamage(),
        attackSpeed: this.getAttackSpeed(),
        critChance: this.getCritChance(),
        critDamage: this.getCritDamage(),
        doubleDamageChance: this.getDoubleDamageChance(),
      };
    },

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

    getBaseDamage() {
      let damage = this.damage;

      // add flat damage
      damage +=
        store.data.upgrades[SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT
        ].getBonus();

      // add percent damage
      damage *=
        1 +
        store.data.upgrades[SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT
        ].getBonus() /
          100;

      return damage;
    },

    getDamage() {
      let damage = this.damage;

      // add flat damage
      damage +=
        store.data.upgrades[SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT
        ].getBonus();

      // add percent damage
      damage +=
        (store.data.upgrades[SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT
        ].getBonus() /
          100) *
        damage;

      // CRIT
      if (getRandomNumber(1, 100) < this.getCritChance()) {
        damage *= 1 + this.getCritDamage() / 100;
      }

      // DOUBLE DAMAGE
      if (getRandomNumber(1, 100) < this.getDoubleDamageChance()) {
        damage *= 2;
      }

      return damage;
    },

    getAttackSpeed() {
      return this.attackSpeed;
    },

    getCritChance() {
      return (
        this.critChance +
        store.data.upgrades[SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_CRIT_CHANCE].getBonus()
      );
    },

    getDoubleDamageChance() {
      return (
        this.doubleDamageChance +
        store.data.upgrades[SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE
        ].getBonus()
      );
    },

    getCritDamage() {
      return (
        this.critDamage +
        store.data.upgrades[SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_CRIT_DAMAGE].getBonus()
      );
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
      [CHARACTER_SKILL_ATTACK]: {
        name: CHARACTER_SKILL_ATTACK,
        cooldown: 500,
        manaCost: 0,
        cast() {
          let damage = store.character.getDamage();
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
        manaCost: 0,
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
