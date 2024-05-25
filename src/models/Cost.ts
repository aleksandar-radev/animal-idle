import { CURRENCY_GOLD, CURRENCY_CRYSTAL } from '../helpers/constants/gameVariables';

export class Cost {
  cost: {
    [key: string]: {
      type: string;
      multiplier: number;
    };
  };

  constructor(data) {
    this.cost = {
      [CURRENCY_GOLD]: {
        type: CURRENCY_GOLD,
        multiplier: 0,
        ...data.cost?.gold,
      },
      [CURRENCY_CRYSTAL]: {
        type: CURRENCY_CRYSTAL,
        multiplier: 0,
        ...data.cost?.crystal,
      },
    };
  }
}
