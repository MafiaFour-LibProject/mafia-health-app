import {
  LayoutDashboard,
  CalendarDays,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MdAnalytics } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Appointments", icon: CalendarDays, path: "/admin/appointments" },
    { label: "Analytics", icon: MdAnalytics, path: "/admin/analytics" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`bg-unt-deep text-white fixed h-screen px-3 py-4 flex flex-col transition-all duration-300 z-50 ${
        isSidebarOpen ? "w-55" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isSidebarOpen ? (
          <img
            src="/images/codeblue-logo-2.png"
            alt="CodeBlue Logo"
            className="w-30 h-20 object-cover"
          />
        ) : (
          <span />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-unt-deep cursor-pointer hover:bg-[#006f34]"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </button>  
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map(({ label, icon: Icon, path }) => {
          const active = isActive(path);
          return (
            <Link
              key={label}
              to={path}
              className={`group flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                active
                  ? "bg-[#006f34] text-white font-semibold"
                  : "hover:bg-[#006f34] text-white"
              } ${!isSidebarOpen ? "justify-center" : ""}`}
            >
              <Icon className="w-5 h-5 min-w-[20px]" />
              {isSidebarOpen && <span>{label}</span>}
              {!isSidebarOpen && (
                <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className={`group flex items-center gap-3 cursor-pointer  mt-auto px-3 py-2 rounded hover:bg-[#006f34] transition-colors ${
          !isSidebarOpen ? "justify-center" : ""
        }`}
      >
        <LogOut className="w-5 h-5 min-w-[20px]" />
        {isSidebarOpen && <span>Logout</span>}
        {!isSidebarOpen && (
          <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
            Logout
          </span>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
