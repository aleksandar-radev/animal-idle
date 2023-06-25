import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import assassinAvatar from '../assets/assassin-avatar.jpg';
import warriorAvatar from '../assets/warrior-avatar.jpg';
import { ENEMY_TYPE_BARBARIAN, ENEMY_TYPE_SORCERESS, ENEMY_TYPE_ASSASSIN, ENEMY_TYPE_WARRIOR } from '../constants/gameVariables';

export const getEnemyAvatarImage = (enemyName) => {
  switch (enemyName) {
    case ENEMY_TYPE_BARBARIAN:
      return berserkerAvatar;
    case ENEMY_TYPE_SORCERESS:
      return sorceressAvatar;
    case ENEMY_TYPE_ASSASSIN:
      return assassinAvatar;
    case ENEMY_TYPE_WARRIOR:
      return warriorAvatar;
  }
};
