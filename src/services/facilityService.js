import { apiClient } from "./config";

// let fakeFacilitiesCache = null; // change later

// // GET all facilities

// export const getAllFacilities = async () => {
//   const res = await apiClient.get("/fake-data/facilities.json");
//   fakeFacilitiesCache = res.data;
//   return res.data;
// };

// // GET single facility by ID

// export const getSingleFacility = async (id) => {
//   const res = await apiClient.get("/fake-data/facilities.json");
//   return res.data.find((f) => String(f._id) === id);
// };

// // Create new facility

// export const createFacility = async (payload) => {
//   const res = await apiClient.get("/fake-data/facilities.json");
//   const newFacility = {
//     ...payload,
//     _id: Date.now().toString(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
//   fakeFacilitiesCache = [newFacility, ...res.data];
//   return newFacility;
// };

// // Update Facility

// export const updateFacility = async (id, payload) => {
//   const res = await apiClient.get("/fake-data/facilities.json");
//   const index = res.data.findIndex((f) => f._id === id);
//   if (index !== -1) {
//     const updatedFacility = {
//       ...res.data[index],
//       ...payload,
//       updatedAt: new Date().toISOString(),
//     };
//     res.data[index] = updatedFacility;
//     fakeFacilitiesCache = [...res.data];
//     return updatedFacility;
//   }
//   return null;
// };

// // Delete Facility

// export const deleteFacility = async (id) => {
//   const res = await apiClient.get("/fake-data/facilities.json");
//   const updatedList = res.data.filter((f) => f._id !== id);
//   fakeFacilitiesCache = updatedList;
//   return id;
// };

// replace later with:

export const getAllFacilities = () => apiClient.get("/api/facilities");

export const getSingleFacility = (id) => apiClient.get(`/api/facilities/${id}`);

export const createFacility = (payload) =>
  apiClient.post("/api/facilities", payload);

export const updateFacility = (id, payload) =>
  apiClient.put(`/api/facilities/${id}`, payload);

export const deleteFacility = (id) => apiClient.delete(`/api/facilities/${id}`);
