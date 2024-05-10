import api from './Api.js';

export class AuthRepo {
  static async getUser() {
    const response = await api.get('/user/session');

    if (!response?.data?.user) {
      return false;
    }

    return response.data.user;
  }

  static async login(email, password) {
    try {
      const data = await api.post('/user/login', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async signUp(email, password) {
    try {
      const data = await api.post('/user/register', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  static async signOut() {
    await api.post('/user/logout');
  }
}
