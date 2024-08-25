import Enemy from '@/models/Enemy';

export const getAllEnemyStats = () => {
  return {
    [Enemy.ENEMY_TYPE_BARBARIAN]: {
      name: Enemy.ENEMY_TYPE_BARBARIAN,
      type: Enemy.ENEMY_TYPE_BARBARIAN,
      health: 100,
      mana: 0,
      damage: 5,
      attackSpeed: 3000,
    },
    [Enemy.ENEMY_TYPE_SORCERESS]: {
      name: Enemy.ENEMY_TYPE_SORCERESS,
      type: Enemy.ENEMY_TYPE_SORCERESS,
      health: 60,
      mana: 10,
      damage: 20,
      attackSpeed: 4000,
    },
    [Enemy.ENEMY_TYPE_ASSASSIN]: {
      name: Enemy.ENEMY_TYPE_ASSASSIN,
      type: Enemy.ENEMY_TYPE_ASSASSIN,
      health: 80,
      mana: 0,
      damage: 10,
      attackSpeed: 2000,
    },
    [Enemy.ENEMY_TYPE_WARRIOR]: {
      name: Enemy.ENEMY_TYPE_WARRIOR,
      type: Enemy.ENEMY_TYPE_WARRIOR,
      health: 150,
      mana: 0,
      damage: 5,
      attackSpeed: 4000,
    },
  };
};

export const getAllEnemyTypes = (): string[] => {
  return [
    Enemy.ENEMY_TYPE_BARBARIAN,
    Enemy.ENEMY_TYPE_SORCERESS,
    Enemy.ENEMY_TYPE_ASSASSIN,
    Enemy.ENEMY_TYPE_WARRIOR,
  ] as const;
};
