import api from './Api.js';

export const CurrenciesRepo = {
  getCurrencies: async (id) => {
    if (!id) {
      throw new Error('User not found');
    }

    let { data: currencies, error } = await api
      .from('currencies')
      .select("*")
      .eq('user_id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error);
    }

    if (Array.isArray(currencies)) {
      throw new Error('Result contains information for other users as well. That is not allowed')
    }

    return currencies;
  },

  updateCurrencies: async (currencies, values) => {
    const { data, error } = await api
      .from('currencies')
      .update(values)
      .eq('user_id', currencies.user_id)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error('Unable to update currencies')
    }

    return data;
  },

  insertCurrencies: async (user) => {
    const { data, error } = await api
      .from('currencies')
      .insert([
        { user_id: user.id },
      ]);

    if (error) {
      throw new Error(error)
    }

    return data;
  },
};
