import authApi from './authApi';

export const createTree = async (seedId) => {
  try {
    const response = await authApi.post('/api/tree', { seedId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTree = async (treeId) => {
  try {
    const response = await authApi.get(`/api/tree/${treeId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const listTrees = async (date, extend = false) => {
  try {
    const params = {};
    if (date) {
      params.date = date;
    }
    if (extend) {
      params.extend = true;
    }
    const response = await authApi.get('/api/tree', { params });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};