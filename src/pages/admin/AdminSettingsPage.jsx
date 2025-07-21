import { useState } from "react";
import { updateFacility } from "../../services/facilityService";
import { updateAdminPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminSettingsPage = ({ facility }) => {
  const navigate = useNavigate();

  const [facilityData, setFacilityData] = useState({
    name: facility?.name || "",
    address: facility?.location?.address || "",
    city: facility?.location?.city || "",
    email: facility?.contact?.email || "",
    phone: facility?.contact?.phone || "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleFacilityUpdate = async () => {
    try {
      setSaving(true);
      await updateFacility(facility._id, {
        name: facilityData.name,
        location: {
          address: facilityData.address,
          city: facilityData.city,
        },
        contact: {
          email: facilityData.email,
          phone: facilityData.phone,
        },
      });
      toast.success("Facility updated successfully");
    } catch {
      toast.error("Failed to update facility");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setSaving(true);
      await updateAdminPassword(passwords);
      toast.success("Password changed. Please log in again.");
      localStorage.removeItem("token");
      navigate("/auth/login");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-2xl shadow space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Facility Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Facility Name"
          value={facilityData.name}
          onChange={(e) =>
            setFacilityData({ ...facilityData, name: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Address"
          value={facilityData.address}
          onChange={(e) =>
            setFacilityData({ ...facilityData, address: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="text"
          placeholder="City"
          value={facilityData.city}
          onChange={(e) =>
            setFacilityData({ ...facilityData, city: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email"
          value={facilityData.email}
          onChange={(e) =>
            setFacilityData({ ...facilityData, email: e.target.value })
          }
          className={inputClass}
        />
        <input
          type="text"
          placeholder="Phone"
          value={facilityData.phone}
          onChange={(e) =>
            setFacilityData({ ...facilityData, phone: e.target.value })
          }
          className={inputClass}
        />
      </div>

      <button
        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${
          saving ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleFacilityUpdate}
        disabled={saving}
      >
        {saving ? "Saving..." : "Update Facility"}
      </button>

      <hr className="my-6" />

      <div>
        <button
          onClick={() => setShowPasswordFields((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showPasswordFields
            ? "Hide Password Fields"
            : "Change Admin Password"}
        </button>

        {showPasswordFields && (
          <div className="mt-4 space-y-4">
            <input
              type="password"
              placeholder="Old Password"
              value={passwords.oldPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, oldPassword: e.target.value })
              }
              className={inputClass}
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className={inputClass}
            />
            <button
              className={`w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition ${
                saving ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePasswordChange}
              disabled={saving}
            >
              {saving ? "Updating..." : "Change Password & Logout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsPage;
