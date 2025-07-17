import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllFacilities,
  deleteFacility,
} from "../../services/facilityService";
import FacilityFormModal from "./FacilityFormModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const data = await getAllFacilities();
      if (!Array.isArray(data)) throw new Error("Invalid facilities data");
      setFacilities(data);
    } catch (err) {
      console.error("Error fetching facilities:", err);
      toast.error("Failed to fetch facilities");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (facility) => {
    setFacilityToDelete(facility);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!facilityToDelete) return;
    try {
      await deleteFacility(facilityToDelete._id);
      toast.success("Facility deleted");
      fetchFacilities();
    } catch (err) {
      console.error("Error deleting facility:", err);
      toast.error("Failed to delete facility");
    } finally {
      setConfirmOpen(false);
    }
  };

  const handleEdit = (facility) => {
    setSelectedFacility(facility);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedFacility(null);
    setModalOpen(true);
  };

  const handleView = (facilityId) => {
    navigate(`/superadmin/facilities/${facilityId}`);
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add Facility
        </button>
      </div>

      {loading ? (
        <p>Loading facilities...</p>
      ) : facilities.length === 0 ? (
        <p>No facilities found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Description</th>
                <th className="py-3 px-4 border-b">Type</th>
                <th className="py-3 px-4 border-b">City</th>
                <th className="py-3 px-4 border-b">Address</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((facility) => (
                <tr key={facility._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{facility.name}</td>
                  <td className="py-3 px-4 border-b">{facility.description}</td>
                  <td className="py-3 px-4 border-b capitalize">
                    {facility.type}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {facility.location?.city}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {facility.location?.address}
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleView(facility._id)}
                        className="text-indigo-600 hover:underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(facility)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(facility)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
