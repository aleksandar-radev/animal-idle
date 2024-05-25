import { CHARACTER_TYPE_BARBARIAN, CHARACTER_TYPE_SORCERESS, CHARACTER_TYPE_DRUID } from '../helpers/constants/gameVariables';
import Character from './Character';

// NOTHING HERE IS PERSISTED. ALL RESETS ON REFRESH
class Characters {

  constructor(store) {
    {
      [CHARACTER_TYPE_BARBARIAN]: new Character({
        name: CHARACTER_TYPE_BARBARIAN,
        type: CHARACTER_TYPE_BARBARIAN,
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
      }),
        [CHARACTER_TYPE_SORCERESS]: new Character({
          name: CHARACTER_TYPE_SORCERESS,
          type: CHARACTER_TYPE_SORCERESS,
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
        }),
          [CHARACTER_TYPE_DRUID]: new Character({
            name: CHARACTER_TYPE_DRUID,
            type: CHARACTER_TYPE_DRUID,
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
          }),
    }
    this.store = store;
    this[CHARACTER_TYPE_BARBARIAN] = new Character(store, CHARACTER_TYPE_BARBARIAN);
    this[CHARACTER_TYPE_SORCERESS] = new Character(store, CHARACTER_TYPE_SORCERESS);
    this[CHARACTER_TYPE_DRUID] = new Character(store, CHARACTER_TYPE_DRUID);
    this.currentMana = 0;
    this.currentHealth = 0;
    this.isAlive = true;
  }

}

export default Characters;
