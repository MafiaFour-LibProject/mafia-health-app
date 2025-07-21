import { apiClient } from "./config";

export const getUserProfile = async () => {
  const response = await apiClient.get("/users/profile");
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put("/users/profile", profileData);
  return response.data;
};

export const deleteUserAccount = async () => {
  const response = await apiClient.delete("/users/account");
  return response.data;
};

export const getAdminDashboard = async () =>
  await apiClient.get("/api/facilities/admin/dashboard");
