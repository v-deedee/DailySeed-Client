import authApi from './authApi';

export const createHabit = async (habitData) => {
  try {
    const response = await authApi.post('/api/habit', 
    {habit: {name: habitData.name, icon: habitData.icon, duration: habitData.duration}, criteria: habitData.criteria});
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to create habit');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const getHabit = async (habitId) => {
  try {
    const response = await authApi.get(`/api/habit/${habitId}`);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to get habit');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const updateHabit = async (habitData, active = true) => {
  try {
    const response = await authApi.put(`/api/habit/${habitData.id}`, 
    {habit: {name: habitData.name, icon: habitData.icon, duration: habitData.duration, active}, criteria: habitData.criteria});

    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to update habit');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const listTrackingHabits = async (treeId) => {
  try {
    const response = await authApi.get(`/api/habit/tracking/${treeId}`);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to list tracking habits');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const trackHabit = async (treeId, habitData) => {
  try {
    const response = await authApi.post(`/api/habit/tracking/${treeId}`, {criteria: habitData});
    if (response.data.ok) {
      console.log(response.data)
      return response.data.data;
    } else {
      throw new Error('Failed to track habit');
    }
  } catch (error) {
    throw error.response.data;
  }
};