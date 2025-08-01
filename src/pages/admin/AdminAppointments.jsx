import { useState, useEffect, useRef } from "react";
import {
  getFacilityAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentsService";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheck,
  FaTimes,
  FaClipboardCheck,
  FaExclamationCircle,
} from "react-icons/fa";

const STATUS_OPTIONS = [
  "all",
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

const statusLabels = {
  confirmed: "Confirm",
  cancelled: "Cancel",
  completed: "Complete",
  pending: "Mark Pending",
};

const AdminAppointments = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    apptId: null,
    newStatus: "",
  });

  const modalRef = useRef();

  const fetchFacilityAppointments = async () => {
    setLoading(true);
    try {
      const data = await getFacilityAppointments();
      const appointments = Array.isArray(data)
        ? data
        : data?.appointments || [];
      setAllAppointments(appointments);
    } catch (error) {
      setError("Failed to load appointments. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilityAppointments();
  }, []);

  const handleStatusUpdate = async () => {
    const { apptId, newStatus } = confirmModal;
    try {
      await updateAppointmentStatus(apptId, newStatus);
      toast.success(`Appointment marked as "${newStatus}"`);
      setConfirmModal({ show: false, apptId: null, newStatus: "" });
      fetchFacilityAppointments();
    } catch (err) {
      toast.error("Failed to update appointment status");
    }
  };

  const filteredAppointments =
    selectedStatus === "all"
      ? allAppointments
      : allAppointments.filter((appt) => appt.status === selectedStatus);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setConfirmModal({ show: false, apptId: null, newStatus: "" });
    }
  };

  useEffect(() => {
    if (confirmModal.show) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [confirmModal.show]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-3 text-sac-state-secondary">
        Appointments Management
      </h1>
      <h2 className="text-unt-deep mb-6">
        Easily view and handle all appointments here.
      </h2>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Filter by status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {filteredAppointments.map((appt) => (
            <li
              key={appt._id}
              className="bg-white shadow-md p-6 rounded-lg border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-sac-state-secondary mb-2">
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
                    appt.status === "confirmed"
                      ? "text-green-600"
                      : appt.status === "cancelled"
                      ? "text-red-600"
                      : appt.status === "completed"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {appt.status}
                </span>
              </p>

              <div className="flex gap-3 mt-3 flex-wrap">
                {STATUS_OPTIONS.filter(
                  (s) => s !== "all" && s !== appt.status
                ).map((statusOption) => (
                  <button
                    key={statusOption}
                    onClick={() =>
                      setConfirmModal({
                        show: true,
                        apptId: appt._id,
                        newStatus: statusOption,
                      })
                    }
                    className={`flex items-center gap-2 text-white py-1 px-4 cursor-pointer rounded hover:opacity-90 transition-all ${
                      statusOption === "confirmed"
                        ? "bg-green-600"
                        : statusOption === "completed"
                        ? "bg-blue-600"
                        : statusOption === "cancelled"
                        ? "bg-gray-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {statusOption === "confirmed" && <FaCheck />}
                    {statusOption === "cancelled" && <FaTimes />}
                    {statusOption === "completed" && <FaClipboardCheck />}
                    {statusOption === "pending" && <FaExclamationCircle />}
                    {statusLabels[statusOption] || statusOption}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {confirmModal.show && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded shadow-md max-w-sm w-full"
          >
            <h2 className="text-lg font-semibold mb-4">
              Confirm Status Change
            </h2>
            <p className="mb-4">
              Are you sure you want to mark this appointment as{" "}
              <strong>{confirmModal.newStatus}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setConfirmModal({ show: false, apptId: null, newStatus: "" })
                }
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
