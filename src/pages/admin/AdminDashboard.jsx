import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../../services/userService";
import { deleteService } from "../../services/serviceService";
import Loader from "../../components/Loader";
import AdminModal from "./AdminModal";
import AdminAddServiceForm from "./AdminAddServiceForm";
import AdminUploadPhotos from "./AdminUploadPhotos";
import {
  Building,
  CheckCircle,
  Star,
  MessageCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const statIcons = [
  <Building className="text-blue-600" size={28} key="building" />,
  <CheckCircle className="text-green-600" size={28} key="check" />,
  <Star className="text-yellow-500" size={28} key="star" />,
  <MessageCircle className="text-purple-600" size={28} key="msg" />,
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  // State to track which facility's photos are being uploaded
  const [uploadingPhotosFor, setUploadingPhotosFor] = useState(null);

  // Dashboard data state
  const [stats, setStats] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal control for adding a service
  const [showAddService, setShowAddService] = useState(null);

  // Service editing state
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);

  // Modal control for delete confirmation
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    serviceId: null,
  });

  // Fetch dashboard data
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await getAdminDashboard();
      setStats(res.data.data.statistics);
      setFacilities(res.data.data.facilities);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const confirmDeleteService = async () => {
    setSaving(true);
    try {
      await deleteService(deleteModal.serviceId);
      toast.success("Service deleted!");
      setDeleteModal({ open: false, serviceId: null });
      await fetchDashboard();
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-8 text-center">
        Admin Dashboard
      </h1>
      <div className="flex justify-end max-w-6xl mx-auto mb-6">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => navigate("/admin/settings")}
        >
          Settings
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {[
            {
              label: "Total Facilities",
              value: stats.totalFacilities,
              icon: statIcons[0],
            },
            {
              label: "Active Facilities",
              value: stats.activeFacilities,
              icon: statIcons[1],
            },
            {
              label: "Average Rating",
              value: stats.averageRating,
              icon: statIcons[2],
            },
            {
              label: "Total Reviews",
              value: stats.totalReviews,
              icon: statIcons[3],
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
            >
              <div className="mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-700">
                {stat.value}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Facilities</h2>
        <div className="space-y-8">
          {facilities.length === 0 ? (
            <div className="text-gray-500 text-center">
              No facilities found.
            </div>
          ) : (
            facilities.map((facility) => (
              <div
                key={facility._id}
                className="bg-white rounded-2xl shadow p-6 space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-green-800">
                      {facility.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                      {facility.type}
                    </span>
                    {facility.isActive && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    {facility.location?.address}, {facility.location?.city}
                  </div>
                  <div className="text-gray-500 text-sm">
                    <span className="font-semibold">Email:</span>{" "}
                    {facility.contact?.email} &nbsp;|&nbsp;
                    <span className="font-semibold">Phone:</span>{" "}
                    {facility.contact?.phone}
                  </div>
                  <div className="mt-2 text-yellow-600 text-sm">
                    <span className="font-semibold">Rating:</span>{" "}
                    {facility.rating?.average ?? 0} ★ (
                    {facility.rating?.count ?? 0})
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-green-700">Services</h4>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                        onClick={() => setShowAddService(facility._id)}
                      >
                        + Add Service
                      </button>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        onClick={() => setUploadingPhotosFor(facility._id)}
                      >
                        Upload Photos
                      </button>
                    </div>
                  </div>

                  {showAddService === facility._id && (
                    <AdminModal onClose={() => setShowAddService(null)}>
                      <AdminAddServiceForm
                        facilityId={facility._id}
                        onClose={() => setShowAddService(null)}
                        onServiceAdded={async () => {
                          setShowAddService(null);
                          await fetchDashboard();
                        }}
                        mode="add"
                      />
                    </AdminModal>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {facility.services && facility.services.length > 0 ? (
                      facility.services.map((service) => (
                        <div
                          key={service._id}
                          className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-gray-800 flex flex-col items-start min-w-[160px] shadow hover:shadow-md transition-all duration-200"
                        >
                          <span className="font-bold text-base mb-1">
                            {service.name}
                          </span>
                          <span className="text-xs text-gray-500 mb-1 truncate w-full">
                            {service.description}
                          </span>
                          <span className="text-green-700 font-semibold mb-2">
                            {service.price?.currency || "GHS"}{" "}
                            {service.price?.amount ?? "0.00"}
                          </span>
                          <div className="flex gap-2 mt-auto">
                            <button
                              className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                              title="Edit service"
                              onClick={() =>
                                setEditingService({
                                  ...service,
                                  facilityId: facility._id,
                                })
                              }
                            >
                              <Pencil size={14} /> Edit
                            </button>
                            <button
                              className="flex items-center gap-1 text-red-600 hover:underline text-xs"
                              title="Delete service"
                              onClick={() =>
                                setDeleteModal({
                                  open: true,
                                  serviceId: service._id,
                                })
                              }
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-400">No services</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {uploadingPhotosFor && (
          <AdminModal onClose={() => setUploadingPhotosFor(null)}>
            <AdminUploadPhotos
              facilityId={uploadingPhotosFor}
              onClose={() => setUploadingPhotosFor(null)}
            />
          </AdminModal>
        )}
      </div>

      {editingService && (
        <AdminModal onClose={() => setEditingService(null)}>
          <AdminAddServiceForm
            facilityId={editingService.facilityId}
            mode="edit"
            initialData={editingService}
            onClose={() => setEditingService(null)}
            onServiceAdded={async () => {
              setEditingService(null);
              await fetchDashboard();
            }}
          />
        </AdminModal>
      )}

      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Delete Service
            </h3>
            <p>Are you sure you want to delete this service?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setDeleteModal({ open: false, serviceId: null })}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white"
                onClick={confirmDeleteService}
                disabled={saving}
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
