import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFacilityServices,
  deleteService,
  searchServices,
} from "../../services/serviceService";
import AdminUploadPhotos from "./AdminUploadPhotos";
import { getSingleFacility } from "../../services/facilityService";
import AdminAddServiceForm from "./AdminAddServiceForm";
import AdminModal from "./AdminModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  PlusCircle,
  Search,
  FileText,
  CalendarDays,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const facilityId = localStorage.getItem("facilityId");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [facilityData, setFacilityData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facilityRes, servicesRes] = await Promise.all([
          getSingleFacility(facilityId),
          getFacilityServices(facilityId),
        ]);
        setFacilityData(facilityRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        toast.error("Failed to load dashboard data.");
      }
    };

    if (facilityId) fetchData();
  }, [facilityId]);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await searchServices(searchTerm);
      setServices(res.data);
    } catch {
      toast.error("Search failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleAddService = (newService) => {
    setServices((prev) => [...prev, newService]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {facilityData.adminName || "Facility Admin"} 👋
            </h1>
            <p className="text-gray-600 mt-1">
              You’re managing{" "}
              <span className="font-medium text-green-700">
                {facilityData.name || "Facility"}
              </span>
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => navigate("/admin/appointments")}
              className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 shadow"
            >
              <CalendarDays size={18} />
              Appointments
            </button>
            <button
              onClick={() => navigate("/admin/reviews")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 shadow"
            >
              <FileText size={18} />
              Reviews
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-900 shadow"
            >
              <PlusCircle size={18} />
              Add Service
            </button>
            <button
              onClick={() => setShowPhotoModal(true)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition text-sm shadow"
            >
              Add Photos
            </button>
          </div>
        </motion.div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services..."
            className="border px-4 py-2 rounded-md w-full max-w-md"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center gap-1"
          >
            <Search size={16} />
            Search
          </button>
        </form>

        <motion.div
          className="bg-white rounded-xl shadow overflow-x-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-400">
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="border-b">
                    <td className="p-4">{service.name}</td>
                    <td className="p-4">{service.type}</td>
                    <td className="p-4">{service.category}</td>
                    <td className="p-4">{service.stock?.quantity}</td>
                    <td className="p-4">GHS {service.price?.amount}</td>
                    <td className="p-4 space-x-2">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => toast.info("Edit coming soon!")}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </div>

      <AdminModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <AdminAddServiceForm
          facilityId={facilityId}
          onClose={() => setShowModal(false)}
          onServiceAdded={handleAddService}
        />
      </AdminModal>

      <AdminModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
      >
        <AdminUploadPhotos
          facilityId={facilityId}
          onClose={() => setShowPhotoModal(false)}
        />
      </AdminModal>
    </div>
  );
};

export default AdminDashboard;
