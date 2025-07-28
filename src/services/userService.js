import { apiClient } from "./config";

export const getUserProfile = async (token) => {
  const response = await apiClient.get("/api/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserProfile = async (token, data) => {
  return await apiClient.put("/api/users/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUserAccount = async (token) => {
  return await apiClient.delete("/api/users/account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAdminDashboard = async () =>
  await apiClient.get("/api/facilities/admin/dashboard");
