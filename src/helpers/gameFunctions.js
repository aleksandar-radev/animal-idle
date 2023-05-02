import berserkerAvatar from '../assets/berserker-avatar.jpg';
import sorceressAvatar from '../assets/sorceress-avatar.jpg';
import { ENEMY_TYPE_BERSERKER, ENEMY_TYPE_SORCERESS } from '../constants/gameVariables';

export const getEnemyAvatarImage = (enemyName) => {
  switch (enemyName) {
    case ENEMY_TYPE_BERSERKER:
      return berserkerAvatar;
    case ENEMY_TYPE_SORCERESS:
      return sorceressAvatar;
  }
};
