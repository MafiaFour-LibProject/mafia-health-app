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
import { Users, Plus, Search, Trash2, Eye, Home } from "lucide-react";

const SuperAdminDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      const data = await getAllFacilities();
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
      await deleteFacility(facilityToDelete._id);
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

  const filteredFacilities = facilities.filter((facility) =>
    facility.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#043927] mb-2">
          SuperAdmin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage all healthcare facilities and admins in the system.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a3d5b0] focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAddFacility}
            className="flex items-center gap-2 bg-[#00853e] cursor-pointer hover:bg-[#006f34] text-white font-medium px-4 py-2 rounded-lg shadow transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Facility
          </button>
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-colors"
          >
            <Users className="w-5 h-5" />
            Add Admin
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : filteredFacilities.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <Home className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No facilities found
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first healthcare facility
            </p>
            <button
              onClick={handleAddFacility}
              className="inline-flex items-center gap-2 bg-[#00853e] hover:bg-[#006f34] text-white font-medium px-4 py-2 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              Add Facility
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFacilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-[#a3d5b0] text-[#043927] rounded-lg w-12 h-12 flex items-center justify-center font-bold text-xl uppercase flex-shrink-0">
                    {facility.name?.[0] || "?"}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#043927]">
                      {facility.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-block text-xs font-medium rounded-full px-2 py-1 ${
                          facility.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {facility.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {facility.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {facility.description || "No description provided"}
                </p>

                <div className="space-y-2 text-sm text-gray-700 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📍</span>
                    <span>
                      {facility.location?.city}, {facility.location?.address}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleView(facility._id)}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1 bg-[#f0f7f2] text-[#00853e] hover:bg-[#e0efe5] font-medium px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => confirmDelete(facility)}
                    className="flex-1 flex items-center  cursor-pointer justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 font-medium px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
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
