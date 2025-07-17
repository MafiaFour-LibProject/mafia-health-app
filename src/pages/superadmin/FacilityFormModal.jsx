import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { createFacility, updateFacility } from "../../services/facilityService";
import { toast } from "react-toastify";

const FacilityFormModal = ({ isOpen, onClose, onSaved, facility }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      if (facility) {
        reset({
          name: facility.name || "",
          location: facility.location || "",
          capacity: facility.capacity || "",
        });
      } else {
        reset({
          name: "",
          location: "",
          capacity: "",
        });
      }
    }
  }, [isOpen, facility, reset]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      if (facility) {
        await updateFacility(facility.id, data);
        toast.success("Facility updated successfully");
      } else {
        await createFacility(data);
        toast.success("Facility created successfully");
      }
      onClose();
      onSaved?.();
    } catch (error) {
      console.error("Error saving facility:", error);
      toast.error("Failed to save facility");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "facility-modal-overlay") onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="facility-modal-overlay"
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {facility ? "Edit Facility" : "Add Facility"}
          </h2>
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
            placeholder="Facility Name"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Capacity"
            {...register("capacity", { required: true, min: 1 })}
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting
              ? "Saving..."
              : facility
              ? "Update Facility"
              : "Add Facility"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacilityFormModal;
