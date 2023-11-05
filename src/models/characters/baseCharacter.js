import {
  SHOP_UPGRADES_ATTACK,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT,
  SHOP_UPGRADES_ATTACK_CRIT_CHANCE,
  SHOP_UPGRADES_ATTACK_CRIT_DAMAGE,
  SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE,
} from '../../constants/gameVariables';
import { getRandomNumber } from '../../helpers/functions';

const BaseCharacter = (store, data) => {
  return {
    name: data.name,
    type: data.type,
    health: data.health || 100,
    mana: data.mana || 50,
    damage: data.damage || 15,
    attackSpeed: data.attackSpeed || 0,
    critChance: data.critChance || 0,
    critDamage: data.critDamage || 0,
    doubleDamageChance: data.doubleDamageChance || 0,

    skills: data.skills,

    getAllStats() {
      return {
        health: this.getHealth(),
        mana: this.getMana(),
        damage: this.getBaseDamage(),
        attackSpeed: this.getAttackSpeed(),
        critChance: this.getCritChance(),
        critDamage: this.getCritDamage(),
        doubleDamageChance: this.getDoubleDamageChance(),
      };
    },

    getHealth() {
      let health = this.health;
      // TODO: add bonuses
      return health;
    },

    getMana() {
      let mana = this.mana;
      // TODO: add bonuses
      return mana;
    },

    getBaseDamage() {
      let damage = this.damage;

      // add flat damage
      damage +=
        store.characters.upgrades[data.type][SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT].getBonus();

      // add percent damage
      damage *=
        1 +
        store.characters.upgrades[data.type][SHOP_UPGRADES_ATTACK][
          SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT
        ].getBonus() /
          100;

      return damage;
    },

    getDamage() {
      let damage = this.getBaseDamage();
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
        store.characters.upgrades[data.type][SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_CRIT_CHANCE].getBonus()
      );
    },

    getDoubleDamageChance() {
      return (
        this.doubleDamageChance +
        store.characters.upgrades[data.type][SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE].getBonus()
      );
    },

    getCritDamage() {
      return (
        this.critDamage +
        store.characters.upgrades[data.type][SHOP_UPGRADES_ATTACK][SHOP_UPGRADES_ATTACK_CRIT_DAMAGE].getBonus()
      );
    },

    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    getAllSkills() {
      return this.skills;
    },

    getSkillById(id) {
      const mapping = store.data.skills.map[id];
      return this.skills[mapping];
    },
  };
};

export default BaseCharacter;
