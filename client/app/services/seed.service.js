import authApi from "./authApi";

export const listSeeds = async () => {
  try {
    const response = await authApi.get("/api/seed");
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to list seeds");
    }
  } catch (error) {
    throw error.response.data;
  }
};

export const listShopSeeds = async () => {
  try {
    const response = await authApi.get("/api/seed/shop");
    if (response.data.ok) {
      return response.data.data;
    } else {
      throw new Error("Failed to list shop seeds");
    }
  } catch (error) {
    // throw error.response.data;
    return error.response.data;
  }
};
