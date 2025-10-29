import { prepareDataForApi } from '@/utils/generalData';
import api from './Api';
import { GUEST_USER_ID } from './AuthRepo';

const GUEST_DATA_STORAGE_KEY = 'animalIdleGuestData';

const hasBrowserStorage = () => typeof window !== 'undefined' && !!window.localStorage;

const loadGuestData = () => {
  if (!hasBrowserStorage()) return null;

  try {
    const raw = window.localStorage.getItem(GUEST_DATA_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse guest data from storage', error);
    return null;
  }
};

const saveGuestData = (data) => {
  if (!hasBrowserStorage()) return;

  try {
    window.localStorage.setItem(GUEST_DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to persist guest data to storage', error);
  }
};

const clearGuestData = () => {
  if (!hasBrowserStorage()) return;

  try {
    window.localStorage.removeItem(GUEST_DATA_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear guest data from storage', error);
  }
};

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
      throw new Error(error?.response?.data?.message ?? 'Unable to load game data.');
    }
  }

  async getDataByUserId(id) {
    if (id === GUEST_USER_ID) {
      const data = loadGuestData();
      return { data_json: data ?? {} };
    }

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
      const status = error?.response?.status;
      const fallbackData = loadGuestData();

      if (status === 401 || status === 403 || status === 404) {
        console.warn('Falling back to local guest data after unauthorized response.');
        return { data_json: fallbackData ?? {} };
      }

      if (fallbackData) {
        console.warn('Falling back to cached guest data after load failure.', error);
        return { data_json: fallbackData };
      }

      throw new Error(error?.response?.data?.message ?? 'Unable to load game data.');
    }
  }

  async updateDataByUserId(id, newData) {
    if (id === GUEST_USER_ID) {
      if (!newData || Object.keys(newData).length === 0) {
        clearGuestData();
      } else {
        saveGuestData(newData);
      }

      return { data_json: newData };
    }

    try {
      let encryptedData = prepareDataForApi(newData);

      const response = await api.patch(`/game-data/${id}`, encryptedData);

      return response.data;
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403 || status === 404 || status === 0) {
        console.warn('Persisting data locally after unauthorized save attempt.');
        if (!newData || Object.keys(newData).length === 0) {
          clearGuestData();
        } else {
          saveGuestData(newData);
        }

        return { data_json: newData ?? {} };
      }

      if (hasBrowserStorage()) {
        console.warn('Persisting data locally after save failure.', error);
        if (!newData || Object.keys(newData).length === 0) {
          clearGuestData();
        } else {
          saveGuestData(newData);
        }

        return { data_json: newData ?? {} };
      }

      throw new Error(error?.response?.data?.message ?? 'Unable to save game data.');
    }
  }

  async getLeaderboard() {
    try {
      const response = await api.get('/game-data/leaderboard');

      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message ?? 'Unable to load leaderboard.');
    }
  }
}
