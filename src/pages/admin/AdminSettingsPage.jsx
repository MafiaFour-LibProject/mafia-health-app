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
  const [activeTab, setActiveTab] = useState("facility");

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
    "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="p-6 max-w-4xl my-6 mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Settings</h1>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "facility"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("facility")}
        >
          Facility Information
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "security"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {activeTab === "facility" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facility Name
              </label>
              <input
                type="text"
                value={facilityData.name}
                onChange={(e) =>
                  setFacilityData({ ...facilityData, name: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={facilityData.email}
                onChange={(e) =>
                  setFacilityData({ ...facilityData, email: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                value={facilityData.address}
                onChange={(e) =>
                  setFacilityData({ ...facilityData, address: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={facilityData.city}
                onChange={(e) =>
                  setFacilityData({ ...facilityData, city: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={facilityData.phone}
                onChange={(e) =>
                  setFacilityData({ ...facilityData, phone: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <button
            className={`w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
            onClick={handleFacilityUpdate}
            disabled={saving}
          >
            {saving ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Facility Information"
            )}
          </button>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Change Password</h3>
            <p className="text-sm text-gray-600 mb-4">
              For security reasons, you'll be logged out after changing your
              password.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwords.oldPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, oldPassword: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPassword: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <button
              className={`mt-4 w-full md:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition ${
                saving ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={handlePasswordChange}
              disabled={saving}
            >
              {saving ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
