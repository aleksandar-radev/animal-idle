import swordIcon from '../../assets/sword.png';
import {
  CHARACTER_TYPE_BARBARIAN,
  CHARACTER_TYPE_DRUID,
  CHARACTER_TYPE_SORCERESS,
  SHOP_UPGRADES_ATTACK,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT,
  SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT,
  SHOP_UPGRADES_ATTACK_BONUS_SPEED,
  SHOP_UPGRADES_ATTACK_CRIT_CHANCE,
  SHOP_UPGRADES_ATTACK_CRIT_DAMAGE,
  SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE,
  SHOP_UPGRADES_DEFENSE,
  SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE,
  SHOP_UPGRADES_DEFENSE_BONUS_HEALTH,
  SHOP_UPGRADES_UTILITY,
  SHOP_UPGRADES_UTILITY_BONUS_GOLD,
} from '../../constants/gameVariables';
import BaseUpgrade from './baseUpgrade';

const getAttackUpgrades = (store, charType) => {
  return store.data.upgrades[charType][SHOP_UPGRADES_ATTACK];
};
const getDefenseUpgrades = (store, charType) => {
  return store.data.upgrades[charType][SHOP_UPGRADES_DEFENSE];
};
const getUtilityUpgrades = (store, charType) => {
  return store.data.upgrades[charType][SHOP_UPGRADES_UTILITY];
};

const Upgrades = (store) => {
  return {
    [CHARACTER_TYPE_BARBARIAN]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT].level,
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_BONUS_SPEED].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE].level,
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH].level,
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE].level,
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            level: getUtilityUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_UTILITY_BONUS_GOLD].level,
          }),
        },
      },
    },
    [CHARACTER_TYPE_SORCERESS]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT].level,
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_BONUS_SPEED].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE].level,
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH].level,
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE].level,
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            level: getUtilityUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_UTILITY_BONUS_GOLD].level,
          }),
        },
      },
    },
    [CHARACTER_TYPE_DRUID]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT].level,
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_SPEED].level,
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            level: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE].level,
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH].level,
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            level: getDefenseUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE].level,
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            level: getUtilityUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_UTILITY_BONUS_GOLD].level,
          }),
        },
      },
    },
  };
};

export default Upgrades;
