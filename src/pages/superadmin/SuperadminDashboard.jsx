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
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LogOut,
  Home,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const SuperAdminDashboard = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const handleLogout = () => {
    navigate("/auth/login");
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
    <div className="flex min-h-screen">
      <div
        className={`bg-green-900 text-white p-4 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-6 text-white hover:text-gray-300 cursor-pointer"
        >
          ☰
        </button>
        <nav className="space-y-4">
          <button
            onClick={handleAddFacility}
            className="flex items-center cursor-pointer gap-2 w-full hover:bg-green-800 px-2 py-1 rounded"
          >
            <Plus className="w-5 h-5" />
            {sidebarOpen && <span>Add Facility</span>}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 hover:bg-green-800 px-2 py-1 rounded"
          >
            <Home className="w-5 h-5" />
            {sidebarOpen && <span>Home</span>}
          </Link>
          <Link
            to="/superadmin/users"
            className="flex items-center gap-2 cursor-pointer hoever:bg-green-800 px-2 py-1 rounded"
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span>Users</span>}
          </Link>
          <Link
            to="/superadmin/analytics"
            className="flex items-center gap-2 hover:bg-green-800 px-2 py-1 rounded"
          >
            <BarChart3 className="w-5 h-5" />
            {sidebarOpen && <span>Analytics</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full cursor-pointer hover:bg-green-800 px-2 py-1 rounded"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </nav>
      </div>

      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-4xl font-extrabold text-green-900 mb-1">
          Welcome to your Dashboard
        </h1>
        <p className="text-lg font-medium text-gray-600 mb-6">
          My Access to Fast Immediate Aid
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-1">
              Facilities
            </h2>
            <p className="text-gray-500">Manage all registered facilities</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddFacility}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 cursor-pointer rounded-lg shadow transition"
            >
              <Plus className="w-5 h-5" />
              Add Facility
            </button>
            <button
              onClick={handleAddAdmin}
              className="inline-flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
            >
              <Plus className="w-5 h-5" />
              Add Facility Admin
            </button>
          </div>
        </div>

        <div className="mb-6 max-w-md">
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {loading ? (
          <Loader />
        ) : facilities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-gray-500">No facilities found.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFacilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg uppercase">
                    {facility.name?.[0] || "?"}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-green-800">
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
                    className="flex-1 inline-flex items-center cursor-pointer justify-center gap-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => confirmDelete(facility)}
                    className="flex-1 cursor-pointer inline-flex items-center justify-center gap-1 bg-red-50 text-red-700 hover:bg-red-100 font-medium px-3 py-1.5 rounded-lg transition"
                  >
                    Remove Facility
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
    </div>
  );
};

export default SuperAdminDashboard;
