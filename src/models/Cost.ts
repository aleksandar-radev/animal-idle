import Currency from './Currency';

export class Cost {
  cost: {
    [key: string]: {
      type: string;
      multiplier: number;
    };
  };

  constructor(data) {
    this.cost = {
      [Currency.CURRENCY_GOLD]: {
        type: Currency.CURRENCY_GOLD,
        multiplier: 0,
        ...data.cost?.gold,
      },
      [Currency.CURRENCY_CRYSTAL]: {
        type: Currency.CURRENCY_CRYSTAL,
        multiplier: 0,
        ...data.cost?.crystal,
      },
    };
  }
}
