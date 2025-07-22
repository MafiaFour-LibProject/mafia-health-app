import { apiClient } from "./config";

// get a user's appointments
export const getUserAppointments = async (userId) => {
  const response = await apiClient.get(`/api/appointments/user/${userId}`);
  return response.data.data;
};

// get appointments by facility

export const getFacilityAppointments = async () => {
  const res = await apiClient.get("/api/appointments/facility");
  return res.data.data;
};

// facility updates an appointment: pending, confirmed, completed, canceled
export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await apiClient.put(
    `/api/
    appointments/${appointmentId}/status`,
    { status }
  );
  return response.data;
};

// user updates an appointment
export const updateAppointment = async (appointmentId, updatedData) => {
  const response = await apiClient.put(
    `/appointments/${appointmentId}`,
    updatedData
  );
  return response.data;
};

// user deletes an appointment
export const deleteAppointment = async (appointmentId) => {
  const response = await apiClient.delete(`/appointments/${appointmentId}`);
  return response.data;
};

// get facility time slots for a specific date
export const getFacilityTimeSlots = async (id, date) => {
  const res = await apiClient.get(`api/facilities/${id}/time-slots`, {
    params: { date },
  });
  return res.data;
};

// book a new appointment
export const requestAppointment = async (data) => {
  const res = await apiClient.post("/api/appointments", data);
  return res.data;
};

// check calendar availability for a facility & service
// export const getFacilityCalendar = async (
//   facilityId,
//   serviceId,
//   startDate,
//   endDate
// ) => {
//   const res = await apiClient.get("/api/appointments/facility/calendar", {
//     params: {
//       facilityId,
//       serviceId,
//       startDate,
//       endDate,
//     },
//   });
//   return res.data;
// };
