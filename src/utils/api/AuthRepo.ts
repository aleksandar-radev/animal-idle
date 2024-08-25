import api from './Api';

export class AuthRepo {
  async getUser() {
    const response = await api.get('/user/session');

    if (!response?.data?.user) {
      return false;
    }

    return response.data.user;
  }

  async login(email, password) {
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

  async signUp(email, password) {
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

  async signOut() {
    await api.post('/user/logout');
  }
}
