import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllFacilities,
  deleteFacility,
} from "../../services/facilityService";
import FacilityFormModal from "./FacilityFormModal";
import FacilityAdminFormModal from "./FacilityAdminFormModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import Loader from "../../components/Loader";

const SuperAdminDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const data = await getAllFacilities();
      if (!Array.isArray(data)) throw new Error("Invalid facilities data");

      const activeFacilities = data.filter(
        (facility) => facility.isActive !== false
      );

      setFacilities(activeFacilities);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      toast.error("Failed to fetch facilities");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFacility = () => {
    setSelectedFacility(null);
    setModalOpen(true);
  };

  const handleAddAdmin = () => {
    setAdminModalOpen(true);
  };

  const handleView = (facilityId) => {
    navigate(`/superadmin/facilities/${facilityId}`);
  };

  const confirmDelete = (facility) => {
    setFacilityToDelete(facility);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!facilityToDelete) return;
    try {
      const res = await deleteFacility(facilityToDelete._id);
      console.log("DELETE response:", res);
      toast.success("Facility deleted");
      setFacilities((prev) =>
        prev.filter((f) => f._id !== facilityToDelete._id)
      );
    } catch (err) {
      console.error("Error deleting facility:", err);
      toast.error("Failed to delete facility");
    } finally {
      setConfirmOpen(false);
      setFacilityToDelete(null);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900 mb-1">
            Facilities
          </h1>
          <p className="text-gray-500">Manage all registered facilities</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddFacility}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Facility
          </button>

          <button
            onClick={handleAddAdmin}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Facility Admin
          </button>
        </div>
      </div>

      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search facilities..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {loading ? (
        <Loader />
      ) : facilities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-16 h-16 text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2"
            />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <p className="text-lg text-gray-500">No facilities found.</p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg uppercase">
                  {facility.name?.[0] || "?"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-blue-800">
                    {facility.name}
                  </h2>
                  <span
                    className={`inline-block text-xs font-medium rounded px-2 py-0.5 ${
                      facility.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {facility.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {facility.description}
              </p>
              <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4">
                <div>
                  <strong>Type:</strong> {facility.type}
                </div>
                <div>
                  <strong>City:</strong> {facility.location?.city}
                </div>
                <div>
                  <strong>Address:</strong> {facility.location?.address}
                </div>
              </div>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleView(facility._id)}
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium px-3 py-1.5 rounded-lg transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  View
                </button>

                <button
                  onClick={() => confirmDelete(facility)}
                  className="flex-1 inline-flex items-center justify-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 font-medium px-3 py-1.5 rounded-lg transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FacilityFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        facility={selectedFacility}
        onSaved={() => {
          setModalOpen(false);
          fetchFacilities();
        }}
      />

      <FacilityAdminFormModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onSaved={() => {
          setAdminModalOpen(false);
          fetchFacilities();
        }}
      />

      <ConfirmationModal
        isOpen={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Facility"
        message={`Are you sure you want to delete '${facilityToDelete?.name}'?`}
      />
    </div>
  );
};

export default SuperAdminDashboard;
