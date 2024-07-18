import { err } from "react-native-svg";
import authApi from "./authApi";

export const createTree = async (seedId) => {
  try {
    const response = await authApi.post("/api/tree", { seedId });
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to create tree");
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
      throw new Error("Failed to get tree");
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const listTrees = async (month, year, extend = false) => {
  try {
    const params = {};
    if (month && year) {
      params.month = month;
      params.year = year;
    }
    if (extend) {
      params.extend = true;
    }
    const response = await authApi.get("/api/tree", { params });
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to list trees");
    }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const updateTree = async (trees) => {
  try {
    const response = await authApi.put(`/api/tree`, { trees: trees });
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to update tree");
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const findTree = async (day, month, year) => {
  try {
    const response = await authApi.get(`/api/tree/${day}/${month}/${year}`);
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to find Tree");
    }
  } catch (error) {
    console.log("Error in findTree: ", error);
    return error.response.data.data;
  }
};

export const buyTree = async (seedId) => {
  try {
    const response = await authApi.post(`/api/seed/buy`, { id: seedId });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateTreeNote = async (treeId, formData) => {
  try {
    const response = await authApi.put(`/api/tree/${treeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to update tree note");
    }
  } catch (error) {
    throw error.response.data;
  }
};
