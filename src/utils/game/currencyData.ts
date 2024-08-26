import Currency from '@/models/Currency';

export const defaultCurrencyData = {
  [Currency.CURRENCY_TYPE_GOLD]: new Currency({
    type: Currency.CURRENCY_TYPE_GOLD,
    name: 'Gold',
    index: 0,
    value: 0,
  }),
  [Currency.CURRENCY_TYPE_CRYSTAL]: new Currency({
    type: Currency.CURRENCY_TYPE_CRYSTAL,
    name: 'Crystal',
    index: 1,
    value: 0,
  }),
};

export const getAllCurrencyTypes = (): string[] => {
  return [Currency.CURRENCY_TYPE_GOLD, Currency.CURRENCY_TYPE_CRYSTAL] as const;
};
