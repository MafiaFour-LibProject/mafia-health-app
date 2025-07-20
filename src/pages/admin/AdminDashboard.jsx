import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/userService";
import { updateService, deleteService } from "../../services/serviceService";
import Loader from "../../components/Loader";
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
  <Building className="text-blue-600" size={28} />,
  <CheckCircle className="text-green-600" size={28} />,
  <Star className="text-yellow-500" size={28} />,
  <MessageCircle className="text-purple-600" size={28} />,
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Service editing
  const [editingService, setEditingService] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [saving, setSaving] = useState(false);

  const [editingFacility, setEditingFacility] = useState(null);
  const [facilityForm, setFacilityForm] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    phone: "",
    email: "",
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    serviceId: null,
  });

  const fetchDashboard = () => {
    setLoading(true);
    getAdminDashboard()
      .then((res) => {
        setStats(res.data.data.statistics);
        setFacilities(res.data.data.facilities);
      })
      .catch(() => toast.error("Failed to load dashboard"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Service edit handlers
  const handleEditService = (service) => {
    setEditingService(service);
    setEditForm({
      name: service.name || "",
      type: service.type || "",
      category: service.category || "",
      quantity: service.stock?.quantity || "",
      amount: service.price?.amount || "",
      currency: service.price?.currency || "GHS",
      requiresAppointment: !!service.requiresAppointment,
      description: service.description || "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "requiresAppointment") {
      setEditForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateService = async () => {
    setSaving(true);
    try {
      await updateService(editingService._id, {
        name: editForm.name,
        type: editForm.type,
        category: editForm.category,
        stock: { quantity: Number(editForm.quantity) || 0 },
        price: {
          amount: Number(editForm.amount) || 0,
          currency: editForm.currency,
        },
        requiresAppointment: !!editForm.requiresAppointment,
        description: editForm.description,
      });
      toast.success("Service updated!");
      setEditingService(null);
      fetchDashboard();
    } catch {
      toast.error("Failed to update service");
    } finally {
      setSaving(false);
    }
  };

  // Delete confirmation modal
  const handleDeleteService = (serviceId) => {
    setDeleteModal({ open: true, serviceId });
  };

  const confirmDeleteService = async () => {
    setSaving(true);
    try {
      await deleteService(deleteModal.serviceId);
      toast.success("Service deleted!");
      setDeleteModal({ open: false, serviceId: null });
      fetchDashboard();
    } catch {
      toast.error("Failed to delete service");
    } finally {
      setSaving(false);
    }
  };

  // Facility edit handlers
  const handleEditFacility = (facility) => {
    setEditingFacility(facility);
    setFacilityForm({
      name: facility.name,
      type: facility.type,
      address: facility.location?.address || "",
      city: facility.location?.city || "",
      phone: facility.contact?.phone || "",
      email: facility.contact?.email || "",
    });
  };

  const handleFacilityFormChange = (e) => {
    setFacilityForm({ ...facilityForm, [e.target.name]: e.target.value });
  };

  const handleUpdateFacility = async () => {
    setSaving(true);
    try {
      toast.success("Facility updated!");
      setEditingFacility(null);
      fetchDashboard();
    } catch {
      toast.error("Failed to update facility");
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

      {/* Stats */}
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

      {/* Facilities List */}
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
                    <button
                      className="ml-2 text-blue-600 hover:bg-blue-50 p-1 rounded"
                      onClick={() => handleEditFacility(facility)}
                      title="Edit Facility"
                    >
                      <Pencil size={18} />
                    </button>
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
                {/* Services */}
                <div className="flex-1">
                  <h4 className="font-semibold text-green-700 mb-2">
                    Services
                  </h4>
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
                          <span className="text-xs text-gray-500 mb-1">
                            {service.description}
                          </span>
                          <span className="text-green-700 font-semibold mb-2">
                            GHS {service.price?.amount}
                          </span>
                          <div className="flex gap-2 mt-auto">
                            <button
                              className="flex items-center gap-1 text-blue-600 hover:underline text-xs"
                              onClick={() => handleEditService(service)}
                            >
                              <Pencil size={14} /> Edit
                            </button>
                            <button
                              className="flex items-center gap-1 text-red-600 hover:underline text-xs"
                              onClick={() => handleDeleteService(service._id)}
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
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4 text-green-700">
              Edit Service
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateService();
              }}
              className="space-y-4 text-sm text-gray-700"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Service Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Type</label>
                  <input
                    type="text"
                    name="type"
                    value={editForm.type || ""}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editForm.category || ""}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity || ""}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Currency</label>
                  <select
                    name="currency"
                    value={editForm.currency || "GHS"}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="GHS">GHS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Price</label>
                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount || ""}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex items-center mt-2 md:col-span-2">
                  <input
                    type="checkbox"
                    name="requiresAppointment"
                    checked={!!editForm.requiresAppointment}
                    onChange={handleEditFormChange}
                    className="mr-2"
                  />
                  <label className="font-medium">Requires Appointment</label>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  className="w-full border rounded p-2 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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

      {/* Edit Facility Modal */}
      {editingFacility && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-bold mb-4">Edit Facility</h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={facilityForm.name}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Facility Name"
              />
              <input
                type="text"
                name="type"
                value={facilityForm.type}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Type"
              />
              <input
                type="text"
                name="address"
                value={facilityForm.address}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Address"
              />
              <input
                type="text"
                name="city"
                value={facilityForm.city}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="City"
              />
              <input
                type="text"
                name="phone"
                value={facilityForm.phone}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Phone"
              />
              <input
                type="email"
                name="email"
                value={facilityForm.email}
                onChange={handleFacilityFormChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Email"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200"
                onClick={() => setEditingFacility(null)}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-green-600 text-white"
                onClick={handleUpdateFacility}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
