import {
  LayoutDashboard,
  PlusSquare,
  CalendarDays,
  Star,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MdAnalytics } from "react-icons/md";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    // { label: "Services", icon: PlusSquare, path: "/admin/services" },
    { label: "Appointments", icon: CalendarDays, path: "/admin/appointments" },
    { label: "Analytics", icon: MdAnalytics, path: "/admin/analytics" },
    // {
    //   label: "Reviews",
    //   icon: Star,
    //   path: `/admin/reviews/${user.facilityId}`,
    // },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div
      className={`bg-unt-deep text-white fixed h-screen px-3 py-4 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "w-50" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isSidebarOpen ? (
          <div className="flex items-center gap-2">
            <img
              src="/images/codeblue-logo-2.png"
              alt="CodeBlue Logo"
              className="w-30 h-20 object-cover"
            />
          </div>
        ) : (
          <span />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full bg-unt-deep hover:bg-sac-state-secondary"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5 cursor-pointer" />
          ) : (
            <ChevronRight className="h-5 w-5 cursor-pointer" />
          )}
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 px-3 py-2 rounded hover:bg-sac-state-secondary transition-colors"
          >
            <Icon className="w-5 h-5" />
            {isSidebarOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-auto px-3 py-2 cursor-pointer rounded hover:bg-sac-state-secondary hover:text-white transition-colors"
      >
        <LogOut className="w-5 h-5" />
        {isSidebarOpen && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
