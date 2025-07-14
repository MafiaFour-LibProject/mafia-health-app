import { apiClient } from "./config";

// // GET all services

// export const getAllServices = async () => {
//   const res = await apiClient.get("/fake-data/services.json");
//   return res.data;
// };

// // GET single service by ID

// export const getSingleService = async (id) => {
//   const res = await apiClient.get("fake-data/services.json");
//   return res.data.find((service) => service._id === id);
// };

// // GET all services for a facility

// export const getServicesByFacility = async (facilityId) => {
//   const res = await apiClient.get("fake-data/services.json");
//   return res.data.filter((s) => s.facility === facilityId);
// };

/* Replace later with: 
GET /services
GET /services/:id
GET /facilities/:id/services
*/

import { apiClient } from "./config";

let fakeServicesCache = null; // change later

// GET all services

export const getAllServicess = async () => {
  const res = await apiClient.get("/fake-data/services.json");
  fakeServicesCache = res.data;
  return res.data;
};

// GET single service by ID

export const getSingleService = async (id) => {
  const res = await apiClient.get("/fake-data/services.json");
  return res.data.find((f) => String(f._id) === id);
};

// Create new service

export const createService = async (payload) => {
  const res = await apiClient.get("/fake-data/services.json");
  const newService = {
    ...payload,
    _id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fakeServicesCache = [newService, ...res.data];
  return newService;
};

// Update service

export const updateService = async (id, payload) => {
  const res = await apiClient.get("/fake-data/services.json");
  const index = res.data.findIndex((f) => f._id === id);
  if (index !== -1) {
    const updatedService = {
      ...res.data[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    res.data[index] = updatedService;
    fakeServicesCache = [...res.data];
    return updatedService;
  }
  return null;
};

// Delete service

export const deleteService = async (id) => {
  const res = await apiClient.get("/fake-data/services.json");
  const updatedList = res.data.filter((f) => f._id !== id);
  fakeServicesCache = updatedList;
  return id;
};

/*  replace later with:

 export const getAllServices = () => apiClient.get("/services");

 export const getSingleService = (id) => apiClient.get(`/services/${id}`)

 export const createService = (payload) => apiClient.post("/services", payload);

 export const updateService = (id, payload) => apiClient.put(`/services/${id}`, payload);

  export const deleteService = (id) => apiClient.delete(`/services/${id}`);

 */
