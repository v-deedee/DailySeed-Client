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
    }
    return { ok, data };
  } catch (error) {
    console.log(error.response.data);
    console.log(1234);
    return { ok: error.response.data.ok, message: error.response.data.message };
  }
};

export const getUserByToken = async () => {
  try {
    const response = await authApi.get('/api/user');
    const { ok, data } = response.data;
    if (ok) {
      return data;
    } else {
      return '';
    }
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data) => {
  try {
    const response = await publicApi.post('/api/user', data);
    return response.data;
  } catch (error) {
    return error.response.data;
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


export const createPaymentIntent = async (amount) => {
  try {
    const response = await authApi.post('/api/user/create-payment-intent', { amount: amount })
    const data = response.data
    if (data.ok) {
      return data.clientSecret;
    } else {
      throw new Error('Failed to create payment intent');
    }
  } catch (error) {
    throw error;
  }
}


export const handlePaymentSuccess = async (amount) => {
  try {
    const response = await authApi.post('/api/user/handle-payment-success', { amount: amount })
    const data = response.data
    if (data.ok) {
      return data.data.profile;
    } else {
      throw new Error('Failed to create payment intent');
    }
  } catch (error) {
    throw error;
  }
}

export const statistic = async () => {
  try {
    const response = await authApi.get('/api/user/statistic');
    const { ok, data } = response.data;
    if (ok) {
      return data;
    } else {
      return '';
    }
  } catch (error) {
    console.log(error);
  }
};