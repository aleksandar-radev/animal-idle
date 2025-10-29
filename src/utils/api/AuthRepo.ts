import api from './Api';

const GUEST_USER_STORAGE_KEY = 'animalIdleGuestUser';
const GUEST_USER_ID = 'local-guest';

type GuestUser = {
  id: string;
  email: string;
  isGuest: true;
};

const hasBrowserStorage = () => typeof window !== 'undefined' && !!window.localStorage;

const loadGuestUser = (): GuestUser | null => {
  if (!hasBrowserStorage()) return null;

  try {
    const raw = window.localStorage.getItem(GUEST_USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to parse guest user from storage', error);
    return null;
  }
};

const saveGuestUser = (user: GuestUser) => {
  if (!hasBrowserStorage()) return;

  try {
    window.localStorage.setItem(GUEST_USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to persist guest user to storage', error);
  }
};

const removeGuestUser = () => {
  if (!hasBrowserStorage()) return;

  try {
    window.localStorage.removeItem(GUEST_USER_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove guest user from storage', error);
  }
};

const ensureGuestUser = (): GuestUser => {
  const existingUser = loadGuestUser();
  if (existingUser) return existingUser;

  const guestUser: GuestUser = {
    id: GUEST_USER_ID,
    email: 'guest@animal-idle.local',
    isGuest: true,
  };

  saveGuestUser(guestUser);
  return guestUser;
};

export class AuthRepo {
  async getUser() {
    try {
      const response = await api.get('/user/session');

      if (!response?.data?.user) {
        return ensureGuestUser();
      }

      removeGuestUser();
      return response.data.user;
    } catch (error) {
      return ensureGuestUser();
    }
  }

  async login(email, password) {
    try {
      const data = await api.post('/user/login', {
        email: email,
        password: password,
      });

      return data;
    } catch (error) {
      throw new Error(error?.response?.data?.message ?? 'Unable to log in. Please try again.');
    }
  }

  async signUp(email, password) {
    try {
      const data = await api.post('/user/register', {
        username: email,
        email: email,
        password: password,
        confirmPassword: password,
      });

      return data;
    } catch (error) {
      throw new Error(error?.response?.data?.message ?? 'Unable to create account. Please try again.');
    }
  }

  async signOut() {
    try {
      await api.post('/user/logout');
      removeGuestUser();
    } catch (error) {
      removeGuestUser();
    }
  }
}

export { GUEST_USER_ID };
