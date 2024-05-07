import authApi from './authApi';

export const createHabit = async (habitData) => {
  try {
    const response = await authApi.post('/api/habit', habitData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getHabit = async (habitId) => {
  try {
    const response = await authApi.get(`/api/habit/${habitId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateHabit = async (habitId, habitData) => {
  try {
    const response = await authApi.put(`/api/habit/${habitId}`, habitData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listTrackingHabits = async (treeId) => {
  try {
    const response = await authApi.get(`/api/habit/tracking/${treeId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const trackHabit = async (treeId, habitData) => {
  try {
    const response = await authApi.post(`/api/habit/tracking/${treeId}`, habitData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};