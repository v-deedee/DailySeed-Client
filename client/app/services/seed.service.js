import authApi from './authApi';

export const createSeed = async (seedData) => {
  try {
    const response = await authApi.post('/api/seed', seedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateSeed = async (seedId, seedData) => {
  try {
    const response = await authApi.put(`/api/seed/${seedId}`, seedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listSeeds = async () => {
  try {
    const response = await authApi.get('/api/seed');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};