import authApi from './authApi';

export const createSeed = async (seedData) => {
  try {
    const response = await authApi.post('/api/seed', seedData);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to create seed');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSeed = async (seedId, seedData) => {
  try {
    const response = await authApi.put(`/api/seed/${seedId}`, seedData);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to update seed');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const listSeeds = async () => {
  try {
    const response = await authApi.get('/api/seed');
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to list seeds');
    }
  } catch (error) {
    throw error.response.data;
  }
};