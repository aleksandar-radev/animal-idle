import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import attackSkill from '../assets/attack-skill.png';
import {
  ASSASSIN_AVATAR,
  BARBARIAN_AVATAR,
  SORCERESS_AVATAR,
  WARRIOR_AVATAR,
  ATTACK_SKILL_IMG,
} from '../constants/gameVariables';
import { toDataURL } from '../helpers/functions';

export function loadAssets(store) {
  toDataURL(berserkerAvatar, (url) => {
    store.assets[BARBARIAN_AVATAR] = url;
  });
  toDataURL(sorceressAvatar, (url) => {
    store.assets[SORCERESS_AVATAR] = url;
  });
  toDataURL(assassinAvatar, (url) => {
    store.assets[ASSASSIN_AVATAR] = url;
  });
  toDataURL(warriorAvatar, (url) => {
    store.assets[WARRIOR_AVATAR] = url;
  });
  toDataURL(attackSkill, (url) => {
    store.assets[ATTACK_SKILL_IMG] = url;
  });
}
