// replace later with:

import { apiClient } from "./config";

export const getAllFacilities = async (params = {}) => {
  const response = await apiClient.get("/api/facilities", { params }); // axios handles encoding
  return response.data;
};

export const getSingleFacility = async (id) =>
  apiClient.get(`/api/facilities/${id}`);

export const createFacility = (payload) =>
  apiClient.post("/api/facilities", payload);

export const updateFacility = (id, payload) =>
  apiClient.put(`/api/facilities/${id}`, payload);

export const deleteFacility = (id) => apiClient.delete(`/api/facilities/${id}`);
