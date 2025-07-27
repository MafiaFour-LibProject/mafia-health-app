import { useState, useEffect } from "react";
import FacilityGrid from "../../components/FacilityGrid";
import { getUserProfile } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  User,
  HelpCircle,
  BookOpen,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [showGrid, setShowGrid] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(token);
        console.log("Fetched user data:", response);
        setUserData(response.user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-darkBlue-800 flex items-center gap-3">
              <User size={32} className="text-darkCyan-600" />
              Welcome{user?.name ? `, ${user.name.split(" ")[0]}!` : " Back!"}
            </h1>
            <p className="text-darkBlue-600/80 mt-2">
              Manage your healthcare journey
            </p>
            {/* {user?.name && (
              <div className="mt-4 text-sm text-darkBlue-700 space-y-1">
                <div>
                  <strong>Name:</strong> {user.name}
                </div>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
              </div>
            )} */}
          </div>

          <div className="flex flex-wrap gap-3">
            {/* <Link to="/user/user-settings">
              <button
                onClick={() => navigate("/user/settings")}
                className="flex items-center gap-2 bg-white border border-darkCyan-200 text-darkCyan-700 cursor-pointer hover:bg-darkCyan-50 px-5 py-2.5 rounded-lg shadow-md transition-all"
              >
                <Settings size={18} />
                Settings
              </button>
            </Link> */}
            <button
              onClick={() => navigate("/user/appointments")}
              className="flex items-center gap-2 bg-unt-deep text-white cursor-pointer hover:bg-sac-state-secondary px-5 py-2.5 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              <CalendarDays size={18} />
              View Appointments
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 relative overflow-hidden border border-gray-200 group">
            <div className="absolute inset-0 bg-gradient-to-r from-darkBlue-500/5 to-darkCyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-darkBlue-100 to-darkCyan-100 rounded-lg text-darkCyan-600">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-darkBlue-800 mb-2">
                  Every Second Counts
                </h2>
                <p className="text-darkBlue-600/90">
                  Quickly access healthcare facilities, manage appointments, and
                  find the care you need.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-darkBlue-500/5 to-darkCyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="font-medium text-darkBlue-700 mb-3">
                Your Activity
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-darkBlue-100">
                  <span className="text-darkBlue-600/90">Upcoming</span>
                  <span className="font-medium text-darkBlue-800">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-darkBlue-600/90">Saved Facilities</span>
                  <span className="font-medium text-darkBlue-800">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-darkBlue-50 to-darkCyan-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-darkBlue-800 flex items-center gap-2">
                <MapPin size={24} className="text-darkCyan-600" />
                Healthcare Facilities
              </h2>
              <button
                onClick={() => setShowGrid((prev) => !prev)}
                className="flex items-center gap-2  bg-unt-deep text-white cursor-pointer hover:bg-sac-state-secondary px-4 py-2.5 rounded-lg shadow-md transition-all hover:shadow-lg"
              >
                {showGrid ? (
                  <span>Hide Facilities</span>
                ) : (
                  <>
                    <MapPin size={18} />
                    <span>Browse Facilities</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {showGrid && (
            <div className="p-6 pt-0">
              <FacilityGrid />
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-darkBlue-500/5 to-darkCyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-darkBlue-100 rounded-lg text-darkBlue-600">
                  <HelpCircle size={20} />
                </div>
                <h3 className="font-semibold text-darkBlue-800">Need Help?</h3>
              </div>
              <p className="text-darkBlue-600/90 mb-4">
                Contact our support team for any questions about your healthcare
                journey.
              </p>
              <button className="text-darkCyan-600 hover:text-darkCyan-700 font-medium flex items-center gap-1">
                Contact Support <span>→</span>
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute inset-0 bg-gradient-to-r from-darkBlue-500/5 to-darkCyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-darkCyan-100 rounded-lg text-darkCyan-600">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-semibold text-darkBlue-800">Health Tips</h3>
              </div>
              <p className="text-darkBlue-600/90 mb-4">
                Discover articles and resources to maintain your wellbeing.
              </p>
              <button className="text-darkCyan-600 hover:text-darkCyan-700 font-medium flex items-center gap-1">
                View Resources <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
