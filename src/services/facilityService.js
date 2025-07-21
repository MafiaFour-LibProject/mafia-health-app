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

export const getSingleFacility = async (id) => {
  const res = await apiClient.get(`/api/facilities/${id}`);
  return res.data;
};

export const createFacility = async (payload) =>
  apiClient.post("/api/facilities", payload);

export const createFacilityAdmin = async (payload) => {
  return apiClient.post("/api/auth/create-facility-admin", payload);
};

export const updateFacility = async (id, payload) =>
  apiClient.put(`/api/facilities/${id}`, payload);

export const deleteFacility = async (id) =>
  apiClient.delete(`/api/facilities/${id}`);
