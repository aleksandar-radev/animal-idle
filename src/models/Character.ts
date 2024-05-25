import {
  SKILLS_ATTACK,
  DAMAGE_FLAT,
  DAMAGE_PERCENT,
  CRIT_CHANCE,
  CRIT_DAMAGE,
  DOUBLE_DAMAGE_CHANCE,
  SKILLS_DEFENSE,
  SKILLS_UTILITY,
} from '../helpers/constants/gameVariables';
import { getRandomNumber } from '../helpers/functions';
import { getAllSkillTypes } from '../helpers/gameFunctions';
import Skill from './Skill';

class Character {
  public name: string
  public type: string
  public level: number
  public experience: number
  public health: number
  public mana: number
  public damage: number
  public attackSpeed: number
  public critChance: number
  public critDamage: number
  public doubleDamageChance: number
  public renderChanges: number
  public isUnlocked: boolean
  public skills: { [key: string]: Skill }

  constructor({
    name,
    type,
    level = 1,
    experience = 1,
    health = 100,
    mana = 50,
    damage = 15,
    attackSpeed = 1000,
    critChance = 0,
    critDamage = 0,
    doubleDamageChance = 0,
    renderChanges = 0,
    isUnlocked = false,
    skills,
  }) {
    this.name = name
    this.type = type
    this.level = level
    this.experience = experience
    this.health = health
    this.mana = mana
    this.damage = damage
    this.attackSpeed = attackSpeed
    this.critChance = critChance
    this.critDamage = critDamage
    this.doubleDamageChance = doubleDamageChance
    this.renderChanges = renderChanges
    this.isUnlocked = isUnlocked
    this.skills = skills
    // this.skills = {
    // let def = characterStats[characterType]; // default values for the current character

    // this.persistentData = store.data.characters[def.type];

    this.skills = {
      [DAMAGE_FLAT]: new Skill({
        name: DAMAGE_FLAT,
        type: SKILLS_ATTACK,
        index: 0,
        level: 1,
        passive: true,

      }),
    };
  }


  // getPassiveSkillsByType(type) {
  //   return Object.values(this.skills[type])
  //     .filter((skill) => {
  //       return skill.isPassive();
  //     })
  //     .sort((a, b) => a > b);
  // }

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
  }

  getLevel() {
    return this.level;
  }

  getExperience() {
    return this.experience;
  }

  getHealth() {
    let health = this.health;
    // TODO: add bonuses
    return health;
  }

  getMana() {
    let mana = this.mana;
    // TODO: add bonuses
    return mana;
  }

  getBaseDamage() {
    let damage = this.damage;

    // add flat damage
    damage += this.skills[DAMAGE_FLAT].getBonus();

    // add percent damage
    // damage *= 1 + this.skills[SKILLS_ATTACK][DAMAGE_PERCENT].getBonus() / 100;

    return damage;
  }

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
  }

  getAttackSpeed() {
    return this.attackSpeed;
  }

  getCritChance() {
    let critChance = this.critChance;
    const bonus = this.skills?.[SKILLS_ATTACK]?.[CRIT_CHANCE].getBonus();
    if (bonus) {
      critChance += bonus;
    }
    return critChance;
  }

  getDoubleDamageChance() {
    // this.skills[SKILLS_ATTACK][DOUBLE_DAMAGE_CHANCE].getBonus();
    return this.doubleDamageChance;
  }

  getCritDamage() {
    // this.skills[SKILLS_ATTACK][CRIT_DAMAGE].getBonus();
    return this.critDamage;
  }

  renderChange() {
    this.renderChanges++;
    if (this.renderChanges > 1e99) {
      this.renderChanges = 0;
    }
  }

  getActiveSkills() {
    return Object.values(this.skills[SKILLS_UTILITY]).filter((skill) => {
      return skill.isActive();
    });
  }
}

export default Character;
