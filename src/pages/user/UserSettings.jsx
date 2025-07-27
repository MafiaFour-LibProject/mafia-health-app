import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  updateUserProfile,
  deleteUserAccount,
} from "../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { User, Mail, Phone, MapPin, LogOut, Trash2 } from "lucide-react";

const UserSettings = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    address: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        contact: user.contact || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUserProfile(token, formData);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount(token);
      toast.success("Account deleted successfully.");
      logout();
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete account.");
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f7f2] to-gray-50 p-4 sm:p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-unt-deep p-6 text-white">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <User className="w-6 h-6" />
            Account Settings
          </h2>
          <p className="text-[#a3d5b0] mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853e] focus:border-[#00853e] transition"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853e] focus:border-[#00853e] transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              Phone Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853e] focus:border-[#00853e] transition"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#00853e] focus:border-[#00853e] transition"
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-unt-deep cursor-pointer hover:bg-sac-state-secondary text-white font-medium rounded-lg shadow-md transition flex items-center justify-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
        <div className="px-6 pb-6 space-y-4 border-t border-gray-200">
          {/* <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button> */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Delete My Account
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Your Account?"
        message="This will permanently delete your account and all associated data. This action cannot be undone."
        confirmText={isLoading ? "Deleting..." : "Delete Account"}
        cancelText="Cancel"
        confirmColor="red"
        onConfirm={confirmDeleteAccount}
        onCancel={() => setIsModalOpen(false)}
        isConfirmLoading={isLoading}
      />
    </div>
  );
};

export default UserSettings;
