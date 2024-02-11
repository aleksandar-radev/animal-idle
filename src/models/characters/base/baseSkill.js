const BaseSkill = (store, data) => {
  return {
    manaCost: 0,
    passive: true,
    ...data,
    isActive() {
      return !this.passive;
    },
    isPassive() {
      return this.passive;
    },
    getName() {
      return this.name;
    },
    getType() {
      return this.type;
    },
    getLevel() {
      return 1;
    },
    getImgUrl() {
      return this.icon;
    },
    getBonus() {
      return this.persistentData.level * 1;
    },
    getCost() {
      return this.persistentData.level * 10 + 5;
    },
  };
};

export default BaseSkill;
