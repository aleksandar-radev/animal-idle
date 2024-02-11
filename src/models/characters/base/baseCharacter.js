import {
  SKILLS_ATTACK,
  DAMAGE_FLAT,
  DAMAGE_PERCENT,
  ATTACK_SPEED,
  CRIT_CHANCE,
  CRIT_DAMAGE,
  DOUBLE_DAMAGE_CHANCE,
  SKILLS_DEFENSE,
  BONUS_DEFENSE,
  BONUS_HEALTH,
  SKILLS_UTILITY,
  BONUS_GOLD,
} from '../../../constants/gameVariables';
import { getRandomNumber } from '../../../helpers/functions';
import BaseSkill from './baseSkill';
import { skillData } from '../../info/characterSkills';
import { characterStats } from '../../info/characterStats';

const BaseCharacter = (store, characterType) => {
  let def = characterStats[characterType]; // default values for the current character

  const createSkills = (skillsType) => {
    return Object.keys(skillData[def.type][skillsType]).reduce(
      (acc, name) => ({
        ...acc,
        [name]: BaseSkill(store, {
          persistentData: store.data.characters[def.type].skills[skillsType][name],
          type: skillsType,
          name: name,
          ...skillData[def.type][skillsType][name],
        }),
      }),
      {},
    );
  };

  return {
    name: def.name,
    type: def.type,
    health: def.health || 100,
    mana: def.mana || 50,
    damage: def.damage || 15,
    attackSpeed: def.attackSpeed || 1000,
    critChance: def.critChance || 0,
    critDamage: def.critDamage || 0,
    doubleDamageChance: def.doubleDamageChance || 0,

    persistentData: store.data.characters[def.type],

    skills: {
      [SKILLS_ATTACK]: createSkills(SKILLS_ATTACK),
      [SKILLS_DEFENSE]: createSkills(SKILLS_DEFENSE),
      [SKILLS_UTILITY]: createSkills(SKILLS_UTILITY),
    },

    getAllAttackPassiveSkills() {
      return [
        this.skills[SKILLS_ATTACK][DAMAGE_FLAT],
        this.skills[SKILLS_ATTACK][DAMAGE_PERCENT],
        this.skills[SKILLS_ATTACK][CRIT_CHANCE],
        this.skills[SKILLS_ATTACK][CRIT_DAMAGE],
        this.skills[SKILLS_ATTACK][ATTACK_SPEED],
        this.skills[SKILLS_ATTACK][DOUBLE_DAMAGE_CHANCE],
      ];
    },

    getAllDefensePassiveSkills() {
      return [this.skills[SKILLS_DEFENSE][BONUS_DEFENSE], this.skills[SKILLS_DEFENSE][BONUS_HEALTH]];
    },

    getAllUtilityPassiveSkills() {
      return [this.skills[SKILLS_UTILITY][BONUS_GOLD]];
    },

    getAllStats() {
      return {
        level: this.getLevel(),
        health: this.getHealth(),
        mana: this.getMana(),
        damage: this.getBaseDamage(),
        attackSpeed: this.getAttackSpeed(),
        critChance: this.getCritChance(),
        critDamage: this.getCritDamage(),
        doubleDamageChance: this.getDoubleDamageChance(),
      };
    },

    getLevel() {
      return this.level;
    },

    getExperience() {
      return this.experience;
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

      console.log(this.skills);
      // add flat damage
      damage += this.skills[SKILLS_ATTACK][DAMAGE_FLAT].getBonus();

      // add percent damage
      damage *= 1 + this.skills[SKILLS_ATTACK][DAMAGE_PERCENT].getBonus() / 100;

      return damage;
    },

    getTotalDamage() {
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
      return this.critChance + this.skills[SKILLS_ATTACK][CRIT_CHANCE].getBonus();
    },

    getDoubleDamageChance() {
      return this.doubleDamageChance + this.skills[SKILLS_ATTACK][DOUBLE_DAMAGE_CHANCE].getBonus();
    },

    getCritDamage() {
      return this.critDamage + this.skills[SKILLS_ATTACK][CRIT_DAMAGE].getBonus();
    },

    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    getActiveSkills() {
      let x = Object.entries(this.skills[SKILLS_UTILITY]).find(([, skill]) => {
        console.log(skill);
        return skill.isActive() === true;
      });
      console.log(x);
      return this.skills;
    },
  };
};

export default BaseCharacter;
