import axios from "axios";
import { apiClient } from "./config";

export const createService = async (facilityId, serviceData) => {
  console.log("Facility ID being used:", facilityId);
  return apiClient.post(`/api/services/${facilityId}/services`, serviceData);
};

// Get a single service by ID
export const getSingleService = async (serviceId) =>
  apiClient.get(`/api/services/${serviceId}`);

//  Get services for a facility
export const getFacilityServices = async (facilityId) =>
  apiClient.get(`/api/services/${facilityId}/services`);

// Update service
export const updateService = async (serviceId, updatedData) =>
  apiClient.put(`/api/services/${serviceId}`, updatedData);

// Delete service

export const deleteService = async (serviceId) =>
  apiClient.delete(`/api/services/${serviceId}`);

// Patch service stock
export const patchServiceStock = async (serviceId, stockData) =>
  apiClient.patch(`/api/services/${serviceId}/stock`, stockData);

// Search services
export const searchServices = async (query) =>
  apiClient.get(`/api/services/search`, { params: { q: query } });

// Upload photos to a facility (max 10)
// facilityService.js

export const uploadFacilityPhotos = async (facilityId, files) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authorization token is missing.");
  }

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  // For debugging
  for (let [key, value] of formData.entries()) {
    console.log("FormData Entry:", key, value);
  }

  return axios.post(
    `https://startuphealth.onrender.com/api/facilities/${facilityId}/photos`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get low-stock services for a facility
export const getLowStockServices = async (facilityId) =>
  apiClient.get(`/api/facilities/${facilityId}/services/low-stock`);
