import crypt from '../helpers/externalLibraries/encrypt';
import { prepareDataForApi } from '../helpers/gameFunctions';
import api from './Api';

export class DataRepo {
  async getAllData() {
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

  async getDataByUserId(id) {
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

  async insertDataById(id, newData) {
    try {
      let encryptedData = prepareDataForApi(newData);
      const response = await api.post(`/user-data/${id}`, encryptedData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async updateDataByUserIdAndPremium(id, newData, premium = 'no') {
    try {
      let encryptedData = prepareDataForApi(newData);

      const response = await api.patch(`/user-data/${id}`, encryptedData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getLeaderboard() {
    try {
      const response = await api.get('/user-data/leaderboard');

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
