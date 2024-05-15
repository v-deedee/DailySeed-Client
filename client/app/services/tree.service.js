import authApi from './authApi';

export const createTree = async (seedId) => {
  try {
    const response = await authApi.post('/api/tree', { seedId });
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to create tree');
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const getTree = async (treeId) => {
  try {
    const response = await authApi.get(`/api/tree/${treeId}`);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to get tree');
    }
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
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error('Failed to list trees');
    }
  } catch (error) {
    throw error.response.data;
  }
};