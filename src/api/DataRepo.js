import crypt from '../externalLibraries/encrypt';
import api from './Api.js';

export const DataRepo = {
  getDataById: async (id) => {
    let { data, error } = await api
      .from('data')
      .select('*')
      .eq('user_id', id)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error);
    }

    if (!data) return;

    const decryptedData = crypt.decrypt(data.data);

    return decryptedData;
  },
  insertDataById: async (id, newData = {}) => {
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('data')
      .insert([{ data: encryptedData, user_id: id }])
      .select('*');

    if (error) {
      throw new Error(error);
    }

    return data;
  },
  updateDataById: async (id, newData = {}) => {
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('data')
      .update({ data: encryptedData })
      .eq('user_id', id);

    if (error) {
      throw new Error(error);
    }

    return data;
  },
};
