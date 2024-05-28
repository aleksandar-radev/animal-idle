import { ENEMY_TYPE_BARBARIAN } from '../helpers/constants/gameVariables'; // Assuming the constant is defined here
import { getAllEnemyStats } from '../helpers/gameFunctions';

class Enemy {
  name: string;
  type: string;
  health: number;
  damage: number;
  attackSpeed: number;
  mana: number;
  level: number;

  constructor({ level = 1, type = ENEMY_TYPE_BARBARIAN }) {
    const stats = getAllEnemyStats()[type];

    this.level = level;
    this.name = stats.name;
    this.type = stats.type;
    this.health = stats.health;
    this.damage = stats.damage;
    this.attackSpeed = stats.attackSpeed;
    this.mana = stats.mana;
  }
}

export default Enemy;
