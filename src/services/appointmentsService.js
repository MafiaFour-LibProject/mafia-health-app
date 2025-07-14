import { apiClient } from "./config";

// Get all appointments

export const getAllAppointments = async () => {
  const res = await apiClient.get("/fake-data/appointments.json");
  return res.data;
};

// Get all appointments by facility

export const getAppointmentByFacility = async (facilityId) => {
  const res = await apiClient.get("/fake-data/appointments.json");
  return res.data.filter((appt) => appt.facility === facilityId);
};

// Get all appointments by user

export const getAppointmentsByUser = async (userId) => {
  const res = await apiClient.get("/fake-data/appointments.json");
  return res.data.filter((appt) => appt.user === userId);
};

/* Replace later with: 
GET /appointments
GET /appointments/facility/:id
GET /appointments/user/:id
*/
