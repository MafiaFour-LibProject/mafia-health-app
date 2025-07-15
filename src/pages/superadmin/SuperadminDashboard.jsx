import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllFacilities } from "../../services/facilityService";
import Loader from "../../components/Loader";
import { MapPin, Eye, Trash2, Users } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import { toast } from "react-toastify";

const SuperAdminDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllFacilities();
      setFacilities(data);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      setError("Failed to load facilities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/facilities/${id}`);
  };

  const handleOpenModal = (facility) => {
    setSelectedFacility(facility);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    // this only clears it form the frontend. to delete from the database, we'd need to call a delete api
    if (!selectedFacility) return;
    toast.success("Facility removed successfully");
    setFacilities((prev) => prev.filter((f) => f._id !== selectedFacility._id));
    setSelectedFacility(null);
    setModalOpen(false);
  };

  const handleViewUsers = () => {
    navigate("/superadmin/users");
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          SuperAdmin Dashboard
        </h1>
        <button
          onClick={handleViewUsers}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          <Users className="size-4" />
          View Users
        </button>
      </div>

      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-green-100 text-green-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {facilities.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No facilities onboarded yet.
                </td>
              </tr>
            ) : (
              facilities.map((facility, idx) => (
                <tr
                  key={facility._id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 font-medium">{facility.name}</td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <MapPin className="text-green-600 size-4" />
                    {facility.location}
                  </td>
                  <td className="px-6 py-4 capitalize">{facility.type}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleView(facility._id)}
                      className="inline-flex items-center gap-1 text-sm bg-gray-600 text-white px-3 py-1.5 rounded hover:bg-gray-700 transition"
                    >
                      <Eye className="size-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleOpenModal(facility)}
                      className="inline-flex items-center gap-1 text-sm bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setSelectedFacility(null);
        }}
        onConfirm={confirmDelete}
        title="Remove Facility?"
        message={`Are you sure you want to remove "${
          selectedFacility?.name || "this facility"
        }"? This action cannot be undone.`}
      />
    </div>
  );
};

export default SuperAdminDashboard;
