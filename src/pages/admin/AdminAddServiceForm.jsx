import { useState } from "react";
import { createService } from "../../services/serviceService";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminAddServiceForm = ({
  facilityId: propFacilityId,
  onClose,
  onServiceAdded,
}) => {
  const facilityId = propFacilityId || localStorage.getItem("facilityId");

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    category: "",
    stock: { quantity: "" },
    price: { amount: "" },
    requiresAppointment: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "quantity") {
      setFormData((prev) => ({
        ...prev,
        stock: {
          quantity: parseInt(value, 10) || "",
        },
      }));
    } else if (name === "amount") {
      setFormData((prev) => ({
        ...prev,
        price: {
          amount: parseFloat(value) || "",
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
    try {
      const payload = {
        ...formData,
        facility: facilityId,
      };

      console.log("Payload being sent to backend:", payload);

      const res = await createService(facilityId, payload);
      const newService = res.data;

      toast.success("Service added successfully!");
      onServiceAdded(newService);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
      <h2 className="text-lg font-semibold text-green-700">Add New Service</h2>

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
        <input
          type="text"
          name="type"
          placeholder="Type (e.g. test, medication)"
          value={formData.type}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. vaccine)"
          value={formData.category}
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Stock Quantity"
          value={formData.stock.quantity}
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="amount"
          placeholder="Price (GHS)"
          value={formData.price.amount}
          onChange={handleChange}
          className="input"
        />
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

      <textarea
        name="description"
        placeholder="Description"
        rows={3}
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded p-2 resize-none"
      />

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
          Add Service
        </button>
      </div>
    </form>
  );
};

export default AdminAddServiceForm;
