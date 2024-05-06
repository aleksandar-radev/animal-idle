import api from './Api.js';

export const AuthRepo = {
  getUser: async () => {
    const { data } = await api.auth.getSession();
    if (!data.session) {
      return false;
    }

    return data.session.user;
  },

  /**
   * Gets the current session of the user + the user
   * @returns {Object} session
   */
  getSession: async () => {
    const data = await api.get('/user/session');

    return data;
  },

  /**
   * Fetches the newest information for the user and returns it
   * @returns {Object} user
   */
  updateUserInfo: async () => {
    const {
      data: { user },
      error,
    } = await api.auth.getUser();
    if (error) {
      throw new Error('No user is logged in');
    }
    return user;
  },

  login: async (email, password) => {
    try {
      const data = await api.post('/user/login', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  signUp: async (email, password) => {
    try {
      const data = await api.post('/user/register', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  signOut: async () => {
    const { error } = await api.auth.signOut();

    if (error) {
      throw new Error('Error while signing up');
    }
  },
};
