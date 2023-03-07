import api from './Api.js';

export const AuthRepo = {

  getSession: async () => {
    const { data: session } = await api.auth.getSession();

    return session;
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
    const { data, error } = await api.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw new Error('Error while logging in');
    }

    return data;
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
