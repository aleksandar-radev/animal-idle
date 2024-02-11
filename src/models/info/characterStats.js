import {
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_DRUID,
  CHARACTER_TYPE_SORCERESS,
} from '../../constants/gameVariables';

/**
 * THE ONLY REQUIRED PROPS ARE: name, type
 * all other props have default values, but these MUST be Unique
 *
 */
export const characterStats = {
  [CHARACTER_TYPE_BARBARIAN]: {
    name: 'Barbarian',
    type: CHARACTER_TYPE_BARBARIAN,
    health: 200,
    damage: 7,
    attackSpeed: 1000,
    mana: 0,
  },
  [CHARACTER_TYPE_SORCERESS]: {
    name: 'Sorceress',
    type: CHARACTER_TYPE_SORCERESS,
    health: 75,
    damage: 11,
    attackSpeed: 1000,
    mana: 100,
  },
  [CHARACTER_TYPE_DRUID]: {
    name: 'Druid',
    type: CHARACTER_TYPE_DRUID,
    health: 150,
    damage: 8,
    attackSpeed: 1000,
    mana: 50,
  },
};
