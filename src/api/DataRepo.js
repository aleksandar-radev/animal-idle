import crypt from '../externalLibraries/encrypt';
import api from './Api.js';

export const DataRepo = {
  getAllData: async () => {
    let { data, error } = await api.from('animal_idle_data').select('*, users (*)').order('user_id', 'asc');

    if (error) {
      throw new Error(error);
    }

    if (!data) return;

    return data.map((d) => {
      return {
        user: { email: d.users.user_email, id: d.users.user_id },
        data: crypt.decrypt(d.data),
      };
    });
  },

  getDataById: async (id) => {
    let { data, error } = await api.from('animal_idle_data').select('*').eq('user_id', id).limit(1).maybeSingle();

    // https://postgrest.org/en/v12/references/errors.html
    // don't throw when request returns != 1 rows
    if (error && error.code !== 'PGRST116') {
      throw new Error(error);
    }

    if (!data || !data.data) return;

    const decryptedData = crypt.decrypt(data.data);

    return decryptedData;
  },

  insertDataById: async (id, newData = {}) => {
    const enemyLevel = newData?.enemy?.level || 0;
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('animal_idle_data')
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
    const enemyLevel = newData?.enemy?.level || 0;
    const encryptedData = crypt.encrypt(JSON.stringify(newData));

    const { data, error } = await api
      .from('animal_idle_data')
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

  getAllScores: async () => {
    let { data, error } = await api
      .from('animal_idle_score')
      .select(
        `*, 
        users (
        user_email
      )`,
      )
      .order('enemy_level', { ascending: false });

    if (error) {
      throw new Error(error);
    }

    return data;
  },
};
