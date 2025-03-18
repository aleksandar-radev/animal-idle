import { prepareDataForApi } from '@/utils/generalData';
import api from './Api';

export class DataRepo {
  async getAllData() {
    try {
      const response = await api.get('/game-data');
      const data = response.data;

      if (!data) return;

      return data.map((d) => {
        return {
          user: { email: d.user.email, id: d.user.id },
          data: d.data_json,
        };
      });
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getDataByUserId(id) {
    try {
      const response = await api.get(`/game-data/${id}`, {
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

  async updateDataByUserId(id, newData) {
    try {
      let encryptedData = prepareDataForApi(newData);

      const response = await api.patch(`/game-data/${id}`, encryptedData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getLeaderboard() {
    try {
      const response = await api.get('/game-data/leaderboard');

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}
