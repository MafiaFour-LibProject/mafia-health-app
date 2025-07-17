// replace later with:

import { apiClient } from "./config";

export const getAllFacilities = async (params = {}) => {
  const response = await apiClient.get("/api/facilities", { params });

  const maybeArray =
    response.data?.facilities || response.data?.data || response.data;

  if (!Array.isArray(maybeArray)) {
    throw new Error("Expected an array of facilities");
  }

  return maybeArray;
};

export const getSingleFacility = async (id) =>
  apiClient.get(`/api/facilities/${id}`);

export const createFacility = (payload) =>
  apiClient.post("/api/facilities", payload);

export const updateFacility = (id, payload) =>
  apiClient.put(`/api/facilities/${id}`, payload);

export const deleteFacility = (id) => apiClient.delete(`/api/facilities/${id}`);
