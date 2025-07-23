import { apiClient } from "./config";

// get all facilities
export const getAllFacilities = async (params = {}) => {
  const response = await apiClient.get("/api/facilities", { params });

  const maybeArray =
    response.data?.facilities || response.data?.data || response.data;

  if (!Array.isArray(maybeArray)) {
    throw new Error("Expected an array of facilities");
  }

  return maybeArray;
};

// get single facility
export const getSingleFacility = async (id) => {
  const res = await apiClient.get(`/api/facilities/${id}`);
  return res.data;
};

// create facility
export const createFacility = async (payload) =>
  apiClient.post("/api/facilities", payload);

// create admin
export const createFacilityAdmin = async (payload) => {
  return apiClient.post("/api/auth/create-facility-admin", payload);
};

// update facility (admin only)
export const updateFacility = async (id, payload) =>
  apiClient.put(`/api/facilities/${id}`, payload);

// remove facility (superadmin only)
export const deleteFacility = async (id) =>
  apiClient.delete(`/api/facilities/${id}`);

// get nearby
export const getNearbyFacilities = async (
  latitude,
  longitude,
  radius = 5,
  type
) => {
  const params = {
    lat: Number(latitude),
    lng: Number(longitude),
    radius,
  };

  if (type) {
    params.type = type;
  }

  const response = await apiClient.get("/api/facilities/nearby", { params });

  const maybeArray =
    response.data?.facilities || response.data?.data || response.data;

  if (!Array.isArray(maybeArray)) {
    throw new Error("Expected an array of nearby facilities");
  }

  return maybeArray;
};

// chatbot
export const queryChatbot = async (message) => {
  try {
    const response = await apiClient.post("/api/chatbot/query", { message });
    return response.data;
  } catch (error) {
    console.error("Chatbot error:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to get chatbot response"
    );
  }
};
