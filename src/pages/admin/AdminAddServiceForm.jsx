import { useState, useEffect } from "react";
import { createService, updateService } from "../../services/serviceService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminAddServiceForm = ({
  facilityId: propFacilityId,
  onClose,
  onServiceAdded,
  mode = "add",
  initialData = {},
}) => {
  const facilityId = propFacilityId || localStorage.getItem("facilityId");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    stock: "", // changed from object to string
    price: { amount: "", currency: "GHS" },
    requiresAppointment: false,
    // description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      const priceData = initialData.price || { amount: "", currency: "GHS" };

      setFormData({
        name: initialData.name || "",
        type: initialData.type || "",
        stock: initialData.stock ?? "", // now just a string
        price: {
          amount: priceData.amount ?? "",
          currency: priceData.currency ?? "GHS",
        },
        requiresAppointment: !!initialData.requiresAppointment,
        // description: initialData.description || "",
      });
    }
  }, [initialData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (["amount", "currency"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      type: formData.type,
      stock: formData.stock, // now string
      price: {
        amount: Number(formData.price.amount),
        currency: formData.price.currency,
      },
      requiresAppointment: !!formData.requiresAppointment,
      // description: formData.description,
    };

    try {
      let res;
      if (mode === "edit") {
        res = await updateService(initialData._id, payload);
        toast.success("Service updated successfully!");
      } else {
        res = await createService(facilityId, payload);
        toast.success("Service added successfully!");
      }

      onServiceAdded(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${mode === "edit" ? "update" : "add"} service.`);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      <h2 className="text-lg font-semibold text-green-700">
        {mode === "edit" ? "Edit Service" : "Add New Service"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Type</option>
          <option value="medication">Medication</option>
          <option value="vaccine">Vaccine</option>
          <option value="test">Test</option>
        </select>

        <input
          type="text"
          name="stock"
          placeholder="Stock (e.g. '100 tablets')"
          value={formData.stock}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Price"
          value={formData.price.amount}
          onChange={handleChange}
          className="input"
          required
        />

        <select
          name="currency"
          value={formData.price.currency}
          onChange={handleChange}
          className="input"
        >
          <option value="GHS">GHS</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <label className="flex items-center space-x-2 text-sm mt-1">
          <input
            type="checkbox"
            name="requiresAppointment"
            checked={formData.requiresAppointment}
            onChange={handleChange}
          />
          <span>Requires Appointment</span>
        </label>
      </div>

      {/* 
      <textarea
        name="description"
        placeholder="Description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded p-2 resize-none"
      />
      */}

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {mode === "edit" ? "Save Changes" : "Add Service"}
        </button>
      </div>
    </form>
  );
};

export default AdminAddServiceForm;
