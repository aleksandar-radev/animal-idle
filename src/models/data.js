import {
  CURRENCY_GOLD,
  CHARACTER_SKILL_ATTACK,
  SKILLS_ATTACK,
  DAMAGE_FLAT,
  ATTACK_SPEED,
  BONUS_HEALTH,
  SKILLS_DEFENSE,
  DAMAGE_PERCENT,
  CRIT_DAMAGE,
  CRIT_CHANCE,
  DOUBLE_DAMAGE_CHANCE,
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_SORCERESS,
  CHARACTER_TYPE_DRUID,
  SKILLS_UTILITY,
  BONUS_DEFENSE,
  BONUS_GOLD,
  CURRENCY_CRYSTAL,
} from '../constants/gameVariables';

// Do not delete anything from here, only add
const Data = () => {
  return {
    dataVersion: 'v0.1',
    language: 'en',
    characters: {
      [CHARACTER_TYPE_BARBARIAN]: {
        level: 1,
        experience: 0,
        isUnlocked: true,
        skills: {
          [SKILLS_ATTACK]: {
            [DAMAGE_FLAT]: {
              level: 0,
            },
            [DAMAGE_PERCENT]: {
              level: 0,
            },
            [CRIT_CHANCE]: {
              level: 0,
            },
            [CRIT_DAMAGE]: {
              level: 0,
            },
            [ATTACK_SPEED]: {
              level: 0,
            },
            [DOUBLE_DAMAGE_CHANCE]: {
              level: 0,
            },
          },
          [SKILLS_DEFENSE]: {
            [BONUS_HEALTH]: {
              level: 0,
            },
            [BONUS_DEFENSE]: {
              level: 0,
            },
          },
          [SKILLS_UTILITY]: {
            [BONUS_GOLD]: {
              level: 0,
            },
            [CHARACTER_SKILL_ATTACK]: {
              cooldownReductionFlat: 0,
            },
          },
        },
      },
      [CHARACTER_TYPE_SORCERESS]: {
        level: 1,
        experience: 0,
        isUnlocked: false,
        skills: {
          [SKILLS_ATTACK]: {
            [DAMAGE_FLAT]: {
              level: 0,
            },
            [DAMAGE_PERCENT]: {
              level: 0,
            },
            [CRIT_CHANCE]: {
              level: 0,
            },
            [CRIT_DAMAGE]: {
              level: 0,
            },
            [ATTACK_SPEED]: {
              level: 0,
            },
            [DOUBLE_DAMAGE_CHANCE]: {
              level: 0,
            },
          },
          [SKILLS_DEFENSE]: {
            [BONUS_HEALTH]: {
              level: 0,
            },
            [BONUS_DEFENSE]: {
              level: 0,
            },
          },
          [SKILLS_UTILITY]: {
            [BONUS_GOLD]: {
              level: 0,
            },
            [CHARACTER_SKILL_ATTACK]: {
              cooldownReductionFlat: 0,
            },
          },
        },
      },
      [CHARACTER_TYPE_DRUID]: {
        level: 1,
        experience: 0,
        isUnlocked: false,
        skills: {
          [SKILLS_ATTACK]: {
            [DAMAGE_FLAT]: {
              level: 0,
            },
            [DAMAGE_PERCENT]: {
              level: 0,
            },
            [CRIT_CHANCE]: {
              level: 0,
            },
            [CRIT_DAMAGE]: {
              level: 0,
            },
            [ATTACK_SPEED]: {
              level: 0,
            },
            [DOUBLE_DAMAGE_CHANCE]: {
              level: 0,
            },
          },
          [SKILLS_DEFENSE]: {
            [BONUS_HEALTH]: {
              level: 0,
            },
            [BONUS_DEFENSE]: {
              level: 0,
            },
          },
          [SKILLS_UTILITY]: {
            [BONUS_GOLD]: {
              level: 0,
            },
            [CHARACTER_SKILL_ATTACK]: {
              cooldownReductionFlat: 0,
            },
          },
        },
      },
    },

    totalDecks: 1,
    activeDeckIndex: 0,
    decks: [[CHARACTER_TYPE_BARBARIAN, CHARACTER_TYPE_SORCERESS], [], [], [], []],

    charactersMap: {
      1: CHARACTER_TYPE_BARBARIAN,
      2: CHARACTER_TYPE_SORCERESS,
      3: CHARACTER_TYPE_DRUID,
    },

    enemy: {
      level: 0,
      maxLevel: 0,
    },

    renderChanges: 0,
    renderChange() {
      this.renderChanges++;
      if (this.renderChanges > 1e99) {
        this.renderChanges = 0;
      }
    },

    currencies: {
      [CURRENCY_GOLD]: {
        value: 0,
      },
      [CURRENCY_CRYSTAL]: {
        value: 0,
      },
    },
  };
};

export default Data;
