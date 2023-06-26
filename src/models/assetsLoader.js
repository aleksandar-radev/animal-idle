import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import {
  ENEMY_TYPE_ASSASSIN,
  ENEMY_TYPE_BARBARIAN,
  ENEMY_TYPE_SORCERESS,
  ENEMY_TYPE_WARRIOR,
} from '../constants/gameVariables';
import { toDataURL } from '../helpers/functions';

export function loadAssets(store) {
  toDataURL(berserkerAvatar, (url) => {
    store.assets[ENEMY_TYPE_BARBARIAN] = url;
  });
  toDataURL(sorceressAvatar, (url) => {
    store.assets[ENEMY_TYPE_SORCERESS] = url;
  });
  toDataURL(assassinAvatar, (url) => {
    store.assets[ENEMY_TYPE_ASSASSIN] = url;
  });
  toDataURL(warriorAvatar, (url) => {
    store.assets[ENEMY_TYPE_WARRIOR] = url;
  });
}
