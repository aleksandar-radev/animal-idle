import Skill from '@/models/Skill';

const skills = {
  // Attack
  [Skill.SKILL_TYPE_DAMAGE_FLAT]: 'Bonus Flat Damage',
  [Skill.SKILL_TYPE_DAMAGE_FLAT + '-description']: (amount) => `Increases your damage by ${amount}`,
  [Skill.SKILL_TYPE_DAMAGE_PERCENT]: 'Bonus % Damage',
  [Skill.SKILL_TYPE_DAMAGE_PERCENT + '-description']: (amount) => `Increases your damage by ${amount} %`,
  [Skill.SKILL_TYPE_CRIT_CHANCE]: 'Chance to crit',
  [Skill.SKILL_TYPE_CRIT_CHANCE + '-description']: (amount) => `Increases your chance to crit by ${amount} %`,
  [Skill.SKILL_TYPE_CRIT_DAMAGE]: 'Chance crit damage',
  [Skill.SKILL_TYPE_CRIT_DAMAGE + '-description']: (amount) => `Increases your critical damage by ${amount} %`,
  [Skill.SKILL_TYPE_ATTACK_SPEED]: 'Attack Speed',
  [Skill.SKILL_TYPE_ATTACK_SPEED + '-description']: (amount) => `Increases your attack speed by ${amount} %`,
  [Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE]: 'Double Damage Chance',
  [Skill.SKILL_TYPE_DOUBLE_DAMAGE_CHANCE + '-description']: (amount) =>
    `Increases your chance to deal double damage by ${amount}`,

  // Defense
  [Skill.SKILL_TYPE_BONUS_HEALTH]: 'Bonus Health',
  [Skill.SKILL_TYPE_BONUS_HEALTH + '-description']: (amount) => `Increases your health by ${amount}`,

  // Utility
  //
};

const misc = {
  // Misc
  resetProgress: 'Reset Progress',
  logout: 'Logout',
  charactersSelectionTitle: 'Character Selection',
  characters: 'Characters',
  decks: 'Decks',
  cost: 'Cost',
  requirements: 'Requirements',
  back: 'Back',
  fight: 'Fight',
  shop: 'Shop',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
  admin: 'Admin',
  cancel: 'Cancel',
  'exit-fight': 'Exit Fight',
  'exit-fight-confirm': 'Are you sure you want to exit the fight? Your progress will be lost.',
  defense: 'Defense',
  utility: 'Utility',
  stats: 'Stats',
  skills: 'Skills',
  items: 'Items',
  gold: 'Gold',
};

const character = {
  name: 'Name',
  experience: 'Experience',
  level: 'Level',
  rank: 'Rank',
  totalHealth: 'Total Health',
  totalMana: 'Total Mana',
  health: 'Health',
  mana: 'Mana',
  damage: 'Damage',
  attack: 'Attack',
  heal: 'Heal',
};

export const en = {
  ...skills,
  ...misc,
  ...character,

  // Others
  multiplier: {
    0: 'ALL',
    1: 'x1',
    10: 'x10',
    50: 'x50',
    100: 'x100',
    200: 'x200',
  },
};
