import api from './Api.js';

export const AuthRepo = {

  getSession: async () => {
    const { data } = await api.auth.getSession();

    return data.session;
  },

  // use sparcely
  getUser: async () => {
    const { data: { user }, error } = await api.auth.getUser();
    if (error) {
      throw new Error('No user is logged in');
    }
    return user;
  },

  signInWithPassword: async (email, password) => {
    try {
      const { data, error } = await api.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error('Wrong email/password');
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  },
  signUp: async (email, password) => {
    const { data, error } = await api.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error('Error while signing up');
    }

    return data;
  },
  signOut: async () => {
    const { error } = await api.auth.signOut();

    if (error) {
      throw new Error('Error while signing up');
    }
  },
};
