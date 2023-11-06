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
  return store.data.characters[charType].upgrades[SHOP_UPGRADES_ATTACK];
};
const getDefenseUpgrades = (store, charType) => {
  return store.data.characters[charType].upgrades[SHOP_UPGRADES_DEFENSE];
};
const getUtilityUpgrades = (store, charType) => {
  return store.data.characters[charType].upgrades[SHOP_UPGRADES_UTILITY];
};

const Upgrades = (store) => {
  return {
    [CHARACTER_TYPE_BARBARIAN]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT],
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[
              SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT
            ],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_ATTACK_BONUS_SPEED],
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_BARBARIAN)[
              SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE
            ],
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH],
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE],
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            persistentData: getUtilityUpgrades(store, CHARACTER_TYPE_BARBARIAN)[SHOP_UPGRADES_UTILITY_BONUS_GOLD],
          }),
        },
      },
    },
    [CHARACTER_TYPE_SORCERESS]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT],
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[
              SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT
            ],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_ATTACK_BONUS_SPEED],
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_SORCERESS)[
              SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE
            ],
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH],
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE],
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            persistentData: getUtilityUpgrades(store, CHARACTER_TYPE_SORCERESS)[SHOP_UPGRADES_UTILITY_BONUS_GOLD],
          }),
        },
      },
    },
    [CHARACTER_TYPE_DRUID]: {
      [SHOP_UPGRADES_ATTACK]: {
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_FLAT],
            icon: swordIcon,
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_DAMAGE_PERCENT],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_CRIT_CHANCE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_CRIT_DAMAGE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_CRIT_DAMAGE],
          }),
        },
        [SHOP_UPGRADES_ATTACK_BONUS_SPEED]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_BONUS_SPEED],
          }),
        },
        [SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE]: {
          ...BaseUpgrade(store, {
            persistentData: getAttackUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_ATTACK_DOUBLE_DAMAGE_CHANCE],
          }),
        },
      },
      [SHOP_UPGRADES_DEFENSE]: {
        [SHOP_UPGRADES_DEFENSE_BONUS_HEALTH]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_DEFENSE_BONUS_HEALTH],
          }),
        },
        [SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE]: {
          ...BaseUpgrade(store, {
            persistentData: getDefenseUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_DEFENSE_BONUS_DEFENSE],
          }),
        },
      },
      [SHOP_UPGRADES_UTILITY]: {
        [SHOP_UPGRADES_UTILITY_BONUS_GOLD]: {
          ...BaseUpgrade(store, {
            persistentData: getUtilityUpgrades(store, CHARACTER_TYPE_DRUID)[SHOP_UPGRADES_UTILITY_BONUS_GOLD],
          }),
        },
      },
    },
  };
};

export default Upgrades;
