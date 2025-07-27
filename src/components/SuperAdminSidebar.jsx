import {
  MdDashboard,
  MdAddHome,
  MdPeople,
  MdAnalytics,
  MdLogout,
} from "react-icons/md";

const SuperAdminSidebar = () => {
  return (
    <div className="w-72 bg-white fixed h-screen flex flex-col border-r border-[#a3d5b0] shadow-lg">
      <div className="px-6 py-5 border-b border-[#a3d5b0] bg-gradient-to-r from-[#00853e]/10 to-white">
        <h1 className="text-2xl font-bold">
          <span className="text-[#00853e]">Super</span>
          <span className="text-[#043927]">Admin</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">Management Console</p>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {[
            { icon: <MdDashboard />, text: "Dashboard" },
            { icon: <MdAddHome />, text: "Add Facility" },
            { icon: <MdPeople />, text: "User Management" },
            { icon: <MdAnalytics />, text: "Performance Analytics" },
          ].map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`
                  flex items-center px-4 py-3 rounded-xl 
                  text-[#043927] hover:bg-[#66c68c]/30 
                  transition-all duration-200
                  hover:translate-x-1 hover:shadow-sm
                  group
                `}
              >
                <span className="text-[#00853e] group-hover:text-[#043927] mr-3 text-xl">
                  {item.icon}
                </span>
                <span className="font-medium">{item.text}</span>
                <span className="ml-auto opacity-0 group-hover:opacity-100 text-[#00853e]">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="px-3 py-5 border-t border-[#a3d5b0] bg-[#f8faf9]">
        <a
          href="#"
          className={`
            flex items-center px-4 py-3 rounded-xl
            text-red-600 hover:bg-red-50
            transition-colors duration-200
          `}
        >
          <MdLogout className="text-xl mr-3" />
          <span className="font-medium">Sign Out</span>
        </a>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
