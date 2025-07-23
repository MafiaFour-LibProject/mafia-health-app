import { useState, useEffect } from "react";
import { getUserAppointments } from "../../services/appointmentsService";
import Loader from "../../components/Loader";
import {
  Calendar,
  Clock,
  MapPin,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock as PendingIcon,
  ArrowBigDownIcon,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

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
        setAllUserAppointments([]);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={18} className="text-green-500" />;
      case "declined":
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <PendingIcon size={18} className="text-yellow-500" />;
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center gap-3">
          <Calendar size={32} className="text-green-800" />
          My Appointments
        </h1>
        <p className="text-darkBlue-600/80">
          View and manage your upcoming healthcare appointments
        </p>
      </div>

      {Array.isArray(allUserAppointments) &&
      allUserAppointments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Calendar size={32} className="text-darkBlue-600" />
          </div>
          <h3 className="text-xl font-medium text-darkBlue-800 mb-2">
            No Appointments Yet
          </h3>
          <p className="text-darkBlue-600/90 max-w-md mx-auto">
            You haven't booked any appointments. Find healthcare facilities and
            schedule your visit.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allUserAppointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-darkBlue-500 to-darkCyan-500"></div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-darkBlue-100 rounded-lg text-darkBlue-600">
                      <ClipboardList size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-darkBlue-800">
                        {appt.service?.name || "General Consultation"}
                      </h2>
                      <div className="flex items-center gap-2 text-darkBlue-600/90 mt-1">
                        <MapPin size={16} className="text-darkCyan-600" />
                        <span>
                          {appt.facility?.name || "Healthcare Facility"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pl-11 space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm text-darkBlue-600/90">
                        <Calendar size={16} className="text-darkBlue-500" />
                        <span>
                          {new Date(appt.appointmentDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-darkBlue-600/90">
                        <Clock size={16} className="text-darkBlue-500" />
                        <span>
                          {appt.timeSlot?.start} - {appt.timeSlot?.end}
                        </span>
                      </div>
                    </div>

                    {appt.reason && (
                      <div className="pt-2">
                        <p className="text-sm text-green-800 font-bold text-darkBlue-700">
                          Reason:
                        </p>
                        <p className="text-darkBlue-600/90 text-sm">
                          {appt.reason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-40 flex flex-col items-start md:items-end justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(appt.status)}
                    <span
                      className={`font-medium text-sm ${
                        appt.status === "accepted"
                          ? "text-green-600"
                          : appt.status === "declined"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() +
                        appt.status.slice(1)}
                    </span>
                  </div>

                  <button className="text-sm text-darkCyan-600 hover:text-darkCyan-700 font-medium hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAppointments;
