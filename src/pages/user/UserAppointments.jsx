// Shows user's appointments booked
import { useState, useEffect } from "react";
import { getUserAppointments } from "../../services/appointmentsService";
import Loader from "../../components/Loader";

const UserAppointments = () => {
  const [allUserAppointments, setAllUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserAppointments = async () => {
    setLoading(true);
    try {
      const data = await getUserAppointments();

      if (Array.isArray(data)) {
        setAllUserAppointments(data);
      } else if (Array.isArray(data?.appointments)) {
        setAllUserAppointments(data.appointments);
      } else {
        setAllUserAppointments;
      }
    } catch (error) {
      setError("Failed to load appointments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      {Array.isArray(allUserAppointments) &&
      allUserAppointments.length === 0 ? (
        <p className="text-gray-600">You don't have any appointments yet.</p>
      ) : (
        <ul className="space-y-4">
          {allUserAppointments.map((appt) => (
            <li
              key={appt._id}
              className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {appt.service?.name || "Service"}
              </h2>
              <p>
                <strong>Facility:</strong> {appt.facility?.name}
              </p>
              <p>
                <strong>Date:</strong> {appt.appointmentDate}
              </p>
              <p>
                <strong>Time:</strong> {appt.timeSlot?.start} -{" "}
                {appt.timeSlot?.end}
              </p>
              <p>
                <strong>Reason:</strong> {appt.reason}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    appt.status === "accepted"
                      ? "text-green-600"
                      : appt.status === "declined"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {appt.status}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAppointments;
