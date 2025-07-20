import { apiClient } from "./config";

export const createReview = async (reviewData) => {
  return await apiClient.post("/api/reviews", reviewData);
};

// Get reviews of a facility

export const getFacilityReviews = (facilityId) =>
  apiClient.get(`/api/reviews/facility/${facilityId}`);

// Delete review

export const deleteReview = async (reviewId, token) => {
  const res = await apiClient.delete(`/api/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
