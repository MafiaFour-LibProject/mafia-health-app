import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { createFacility } from "../../services/facilityService";
import { toast } from "react-toastify";

const FacilityFormModal = ({ isOpen, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        type: "",
        address: "",
        city: "",
        email: "",
        phone: "",
        website: "",
        latitude: "",
        longitude: "",
      });
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, reset]);

  const onSubmit = async (data) => {
    const latitude = parseFloat(data.latitude);
    const longitude = parseFloat(data.longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      toast.error("Please enter valid latitude and longitude.");
      return;
    }

    const payload = {
      name: data.name,
      type: data.type,
      location: {
        address: data.address,
        city: data.city,
        geometry: {
          coordinates: [longitude, latitude],
        },
        latitude,
        longitude,
      },
      contact: {
        email: data.email,
        phone: data.phone,
        website: data.website,
      },
    };
    console.log("Payload being sent to backend:", payload);

    try {
      await createFacility(payload);
      toast.success("Facility created successfully");
      onClose();
      onSaved?.();
    } catch (error) {
      console.error("Error creating facility:", error);
      const errMsg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create facility";
      toast.error(errMsg);
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
          <h2 className="text-lg font-semibold">Add New Facility</h2>
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
            {...register("name", { required: "Facility name is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Type (e.g., hospital, clinic)"
            {...register("type", { required: "Facility type is required" })}
            className="w-full px-3 py-2 border rounded-md"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: "Address is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Phone"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <input
            type="text"
            placeholder="Website"
            {...register("website")}
            className="w-full px-3 py-2 border rounded-md"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              {...register("latitude", {
                required: "Latitude is required",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              {...register("longitude", {
                required: "Longitude is required",
              })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Add Facility"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacilityFormModal;
