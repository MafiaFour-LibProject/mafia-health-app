import {
  Home,
  PlusSquare,
  CalendarCheck,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
{
  AuthContext;
}
import { AuthContext } from "../contexts/AuthContext";
const SidebarUser = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { label: "Home", icon: <Home />, to: "/" },
    { label: "Dashboard", icon: <LayoutDashboard />, to: "/user" },
    {
      label: "Appointments",
      icon: <CalendarCheck />,
      to: "/user/appointments",
    },
    { label: "Settings", icon: <Settings />, to: "/user/user-settings" },
  ];

  return (
    <div
      className={`bg-unt-deep text-white fixed h-screen px-2 flex flex-col transition-all duration-300 shadow-md z-50 ${
        isSidebarOpen ? "w-45" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between px-2 mb-6">
        {isSidebarOpen ? (
          <img
            src="/images/codeblue-logo-2.png"
            alt="CodeBlue Logo"
            className="w-25 h-20 object-cover"
          />
        ) : (
          <div className="h-12 w-14 " />
        )}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full cursor-pointer bg-green-800 hover:bg-sac-state-secondary hover:text-white"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <div className="text-center">
              <ChevronRight className="h-5 w-5 " />
            </div>
          )}
        </button>
      </div>

      <ul className="space-y-2 flex-grow overflow-auto">
        {navItems.map(({ label, icon, to }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex items-center gap-3 py-2 px-3 rounded hover:bg-sac-state-secondary transition"
            >
              <span className="text-xl">{icon}</span>
              {isSidebarOpen && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-3 py-2 px-3 rounded hover:bg-sac-state-secondary w-full transition"
        >
          <LogOut className="text-xl" />
          {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarUser;
