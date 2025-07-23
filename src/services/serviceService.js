import { apiClient } from "./config";
import axios from "axios";

// Create a service for a facility
export const createService = async (facilityId, serviceData) => {
  return apiClient.post(`/api/services/${facilityId}/services`, serviceData);
};

// Get all services for a facility
export const getFacilityServices = async (facilityId) => {
  return apiClient.get(`/api/services/${facilityId}/services`);
};

// Get a single service by ID
export const getSingleService = async (facilityId) => {
  return apiClient.get(`/api/services/${facilityId}/services`);
};

// Update a service
export const updateService = async (serviceId, updatedData) => {
  return apiClient.put(`/api/services/${serviceId}`, updatedData);
};

// Delete a service
export const deleteService = async (serviceId) => {
  return apiClient.delete(`/api/services/${serviceId}`);
};

// Patch service stock (e.g., for inventory updates)
export const patchServiceStock = async (serviceId, stockData) => {
  return apiClient.patch(`/api/services/${serviceId}/stock`, stockData);
};

// Search for services by a query string
export const searchServices = async (query) => {
  return apiClient.get(`/api/services/search`, {
    params: { q: query },
  });
};

// Upload photos to a facility
export const uploadFacilityPhotos = async (facilityId, files) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  if (!token) throw new Error("Authorization token is missing.");

  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/facilities/${facilityId}/photos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get services with low stock for a facility
export const getLowStockServices = async (facilityId) => {
  return apiClient.get(`/api/facilities/${facilityId}/services/low-stock`);
};
