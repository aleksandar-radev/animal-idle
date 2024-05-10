import crypt from '../externalLibraries/encrypt';
import api from './Api.js';

export class DataRepo {
  static async getAllData() {
    try {
      const response = await api.get('/user-data');
      const data = response.data;

      if (!data) return;

      return data.map((d) => {
        return {
          user: { email: d.users.user_email, id: d.users.user_id },
          data: crypt.decrypt(d.data),
        };
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async getDataById(id) {
    try {
      const response = await api.get(`/user-data/${id}`, {
        params: {
          premium: 'no',
        },
      });
      const data = response.data;

      if (!data) return;

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async insertDataById(id, newData = {}) {
    try {
      const enemyLevel = newData?.enemy?.level || 0;
      const encryptedData = crypt.encrypt(JSON.stringify(newData));

      const response = await api.post('/user-data', { data: encryptedData, highest_level: enemyLevel });
      console.log(response);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async updateDataById(id, newData = {}) {
    try {
      console.log(newData);
      console.log(JSON.stringify(newData));
      const encryptedData = crypt.encrypt(JSON.stringify(newData));
      console.log(encryptedData);

      const response = await api.patch('/user-data/' + id, { data_json: encryptedData });

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async getAllScores() {
    try {
      const response = await api.get('/user-data');

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
