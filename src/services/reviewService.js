import { apiClient } from "./config";

// Get all reviews

export const getAllReviews = async () => {
  const res = await apiClient.get("/fake-data/reviews.json");
  return res.data;
};

// Get reviews for a facility

export const getReviewsByFacility = async (facilityId) => {
  const res = await apiClient.get("/fake-data/reviews.json");
  return res.data.filter((r) => r.facility === facilityId);
};

/* Replace later with:
GET /reviews
GET /facilities/:id/reviews
*/
