import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import attackSkill from '../assets/attack-skill.png';
import healSkill from '../assets/heal-skill.png';
import {
  ASSASSIN_AVATAR,
  BARBARIAN_AVATAR,
  SORCERESS_AVATAR,
  WARRIOR_AVATAR,
  ATTACK_SKILL_IMG,
  HEAL_SKILL_IMG,
} from '../constants/gameVariables';
import { toDataURL } from '../helpers/functions';

const USE_BASE64 = false;

export function loadAssets(store) {
  let converter = USE_BASE64
    ? toDataURL
    : (url, callback) => {
        callback(url);
      };

  converter(berserkerAvatar, (url) => {
    store.assets[BARBARIAN_AVATAR] = url;
  });
  converter(sorceressAvatar, (url) => {
    store.assets[SORCERESS_AVATAR] = url;
  });
  converter(assassinAvatar, (url) => {
    store.assets[ASSASSIN_AVATAR] = url;
  });
  converter(warriorAvatar, (url) => {
    store.assets[WARRIOR_AVATAR] = url;
  });
  converter(attackSkill, (url) => {
    store.assets[ATTACK_SKILL_IMG] = url;
  });
  converter(healSkill, (url) => {
    store.assets[HEAL_SKILL_IMG] = url;
  });
}
