import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { createFacilityAdmin } from "../../services/facilityService";
import { getAllFacilities } from "../../services/facilityService";
import { toast } from "react-toastify";

const FacilityAdminFormModal = ({ isOpen, onClose, onSaved }) => {
  const [facilities, setFacilities] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getAllFacilities();
        const activeFacilities = data.filter((f) => f.isActive !== false);
        setFacilities(activeFacilities);
      } catch (err) {
        console.error("Error fetching facilities:", err);
        toast.error("Failed to load facilities");
      }
    };

    if (isOpen) {
      fetchFacilities();
      reset({
        fullName: "",
        email: "",
        // password: "",
        contact: "",
        facility: "",
      });
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      await createFacilityAdmin(data);
      console.error(
        "Error creating facility admin:",
        err.response?.data || err.message
      );

      toast.success("Facility admin created successfully");
      onClose();
      onSaved?.();
    } catch (error) {
      console.error("Error creating facility admin:", error);
      toast.error("Failed to create facility admin");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "facility-admin-modal-overlay") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="facility-admin-modal-overlay"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add Facility Admin</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          {/* <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          /> */}
          <input
            type="text"
            placeholder="Contact"
            {...register("contact", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />

          <select
            {...register("facility", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility._id} value={facility._id}>
                {facility.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Create Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacilityAdminFormModal;
