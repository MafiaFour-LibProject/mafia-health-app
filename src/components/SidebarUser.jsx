import {
  Home,
  CalendarCheck,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const SidebarUser = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Home", icon: Home, to: "/" },
    { label: "Dashboard", icon: LayoutDashboard, to: "/user" },
    { label: "Appointments", icon: CalendarCheck, to: "/user/appointments" },
    { label: "Settings", icon: Settings, to: "/user/user-settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-unt-deep text-white fixed h-screen px-2 py-4 flex flex-col transition-all duration-300 shadow-md z-50 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-2 mb-6">
        {isSidebarOpen ? (
          <img
            src="/images/codeblue-logo-2.png"
            alt="CodeBlue Logo"
            className="w-28 h-20 object-cover"
          />
        ) : (
          <div className="h-12 w-14" />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full cursor-pointer bg-green-800 hover:bg-[#006f34]"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>
      </div>

      <ul className="space-y-2 flex-grow overflow-auto">
        {navItems.map(({ label, icon: Icon, to }) => {
          const active = isActive(to);
          return (
            <li key={label}>
              <Link
                to={to}
                className={`group relative flex items-center gap-3 py-2 px-3 rounded transition-colors ${
                  active
                    ? "bg-[#006f34] text-white font-semibold"
                    : "hover:bg-[#006f34] text-white"
                } ${!isSidebarOpen ? "justify-center" : ""}`}
              >
                <Icon className="text-xl" />
                {isSidebarOpen && <span className="text-sm">{label}</span>}
                {!isSidebarOpen && (
                  <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
                    {label}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className={`group relative flex items-center cursor-pointer gap-3 py-2 px-3 rounded transition-colors hover:bg-[#006f34] w-full ${
            !isSidebarOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className="text-xl" />
          {isSidebarOpen && <span className="text-sm">Logout</span>}
          {!isSidebarOpen && (
            <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SidebarUser;
