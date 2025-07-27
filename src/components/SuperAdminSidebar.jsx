import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Home, BarChart3, LayoutDashboard } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Dashboard", to: "/superadmin", icon: LayoutDashboard },
  { label: "Analytics", to: "/superadmin/analytics", icon: BarChart3 },
];

const SuperAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(); // Clears token / user session
    navigate("/"); // Redirect to home
  };

  const isActive = (to) => location.pathname === to;

  return (
    <div
      className={`bg-[#00853e] text-white fixed h-full flex flex-col transition-all duration-300 z-40 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-[#66c68c]">
        {sidebarOpen ? (
          <h1 className="text-xl font-bold">SuperAdmin</h1>
        ) : (
          <div className="w-6" />
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-full hover:bg-[#66c68c]/30 transition-colors"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {navLinks.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive(to)
                ? "bg-[#66c68c] text-white"
                : "hover:bg-[#66c68c]/30 text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Icon className="w-5 h-5 min-w-[20px]" />
            {sidebarOpen ? (
              <span>{label}</span>
            ) : (
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
                {label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className={`group relative cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#66c68c]/30 w-full ${
            !sidebarOpen ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5 min-w-[20px]" />
          {sidebarOpen ? (
            <span>Logout</span>
          ) : (
            <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 z-50">
              Logout
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
