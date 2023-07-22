import crypt from '../externalLibraries/encrypt';
import api from './Api.js';

export const DataRepo = {
  getAllData: async () => {
    let { data, error } = await api.from('data').select('*').order('user_id', 'asc');

    if (error) {
      throw new Error(error);
    }

    if (!data) return;

    return data.map((d) => {
      return { user: d.user_id, data: crypt.decrypt(d.data) };
    });
  },

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
    const enemyLevel = newData.enemy.level;
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('data')
      .insert([{ data: encryptedData, user_id: id }])
      .select('*');

    // add score
    await api.from('animal_idle_score').insert([{ enemy_level: enemyLevel, user_id: id }]);

    if (error) {
      throw new Error(error);
    }

    return data;
  },

  updateDataById: async (id, newData = {}) => {
    const enemyLevel = newData.enemy.level;
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('data')
      .update([{ data: encryptedData }])
      .eq('user_id', id)
      .select('*');

    // add score
    await api
      .from('animal_idle_score')
      .update([{ enemy_level: enemyLevel }])
      .eq('user_id', id)
      .select('*');

    if (error) {
      throw new Error(error);
    }

    return data;
  },
};
