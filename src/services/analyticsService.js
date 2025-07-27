import { apiClient } from "./config";

// get analytics for a facility
// export const getFacilityAnalytics = async () => {
//   const response = await apiClient.get("/api/facilities/analytics");
//   return response.data;
// };

export const getFacilityAnalytics = async () => {
  const response = await apiClient.get("/api/analytics/facility");
  return response.data;
};
