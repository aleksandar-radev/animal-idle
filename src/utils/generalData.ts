import crypt from './externalLibraries/encrypt';
import berserkerAvatar from '@/assets/berserker-avatar.jpg';
import swordIcon from '@/assets/sword.png';
import rageIcon from '@/assets/rage.png';
import druidAvatar from '@/assets/druid-avatar.png';
import sorceressAvatar from '@/assets/sorceress-avatar.jpg';
import assassinAvatar from '@/assets/assassin-avatar.jpg';
import warriorAvatar from '@/assets/warrior-avatar.jpg';
import attackSkillIcon from '@/assets/attack-skill.png';
import swingIcon from '@/assets/swing.png';
import doubleStrikeIcon from '@/assets/double-strike.png';
import doubleCastIcon from '@/assets/double-cast.png';
import powerUpIcon from '@/assets/power-up.png';
import healSkillIcon from '@/assets/heal-skill.png';
import shieldIcon from '@/assets/shield.png';
import goldBarIcon from '@/assets/gold-bar.png';
import Enemy from '@/models/Enemy';
import Skill from '@/models/Skill';
import Data from '@/models/Data';
import Requirement from '@/models/Requirement';
import Character from '@/models/Character';

const USE_BASE64 = false;

export function loadAssets(assets) {
  let converter = USE_BASE64
    ? toDataURL
    : (url, callback) => {
        callback(url);
      };

  converter(berserkerAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_BARBARIAN] = url;
  });
  converter(sorceressAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_SORCERESS] = url;
  });
  converter(druidAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_DRUID] = url;
  });
  converter(assassinAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_ASSASSIN] = url;
    assets[Enemy.ENEMY_TYPE_ASSASSIN] = url;
  });
  converter(warriorAvatar, (url: string) => {
    assets[Character.CHARACTER_TYPE_WARRIOR] = url;
    assets[Enemy.ENEMY_TYPE_WARRIOR] = url;
  });
  converter(swordIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_DAMAGE_FLAT] = url;
  });
  converter(rageIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_RAGE] = url;
  });
  converter(attackSkillIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_DAMAGE_PERCENT] = url;
  });
  converter(swingIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_CRIT_CHANCE] = url;
  });
  converter(doubleStrikeIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_CRIT_DAMAGE] = url;
  });
  converter(powerUpIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_ATTACK_SPEED] = url;
  });
  converter(doubleCastIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE] = url;
  });
  converter(healSkillIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_BONUS_HEALTH] = url;
  });
  converter(shieldIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_BONUS_DEFENSE] = url;
  });
  converter(goldBarIcon, (url: string) => {
    assets[Skill.SKILL_TYPE_BONUS_GOLD] = url;
  });
}

function stripUnderscores(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(stripUnderscores);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = key.startsWith('_') ? key.slice(1) : key;
      acc[newKey] = stripUnderscores(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
}

export const prepareDataForApi = (data: Data) => {
  let newData = stripUnderscores({ ...data });
  delete newData.data_json;

  const encryptedData = crypt.encrypt(JSON.stringify(newData));
  return { data_json: encryptedData };
};

export function mergeObjectsRecursive(obj1, obj2) {
  const result = { ...obj1 };
  Object.keys(obj2).forEach((key) => {
    if (typeof obj2[key] === 'object' && obj2[key] !== null) {
      if (typeof result[key] === 'object' && result[key] !== null) {
        result[key] = mergeObjectsRecursive(result[key], obj2[key]);
      } else {
        result[key] = { ...obj2[key] };
      }
    } else {
      result[key] = obj2[key];
    }
  });
  return result;
}

// inclusive
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

export const getRequirementTypes = () => {
  return [
    Requirement.REQUIREMENT_TYPE_LEVEL,
    Requirement.REQUIREMENT_TYPE_CURRENCY,
    Requirement.REQUIREMENT_TYPE_SKILL,
    Requirement.REQUIREMENT_TYPE_CHARACTER_UNLOCKED,
    Requirement.REQUIREMENT_TYPE_UPGRADE,
  ] as const;
};
