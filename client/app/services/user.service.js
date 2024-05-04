import authApi from './authApi';
import publicApi from './publicApi';
import { saveTokenToLocalStorage, deleteTokenFromLocalStorage } from '../services/auth/token.services';
import User from '../models/User';
import Profile from '../models/Profile';
import { setUser } from '../contexts/user.context';


export const login = async (username, password) => {
  try {
    const response = await publicApi.post('/api/auth/login', { username, password });
    const { ok, data } = response.data;
    if (ok) {
      const { token, payload } = data;
      await saveTokenToLocalStorage(token);
      return { user: new User(payload.id, payload.username ) };
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
};

export const getUserByToken = async () => {
  try {
    const response = await authApi.get('/api/user');
    const { ok, data } = response.data;
    if (ok) {
      return { user: new User(data.user.id, data.user.username, new Profile(data.profile.id, data.profile.email, data.profile.picture, data.profile.money))};
    }
    throw new Error('Failed to get user by token');
  } catch (error) {
    throw error;
  }
};

export const register = async (username, password, email) => {
  try {
    const response = await publicApi.post('/api/user', { username, password, email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
    try {
      await deleteTokenFromLocalStorage();
  
      return true;
    } catch (error) {
      throw error;
    }
  };