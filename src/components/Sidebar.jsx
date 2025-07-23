import {
  MdDashboard,
  MdAddBox,
  MdEventNote,
  MdRateReview,
  MdSettings,
  MdLogout,
  MdHome,
} from "react-icons/md";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`bg-gray-600 fixed h-screen px-4 py-2 flex flex-col mb-10 ${
          isSidebarOpen ? "w-60" : "w-20"
        } transition-all duration-300`}
      >
        <div
          className={`flex items-center ${
            isSidebarOpen ? "justify-end" : "justify-center"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-gray-500 hover:bg-gray-600 focus:outline-none"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-white" />
            ) : (
              <ChevronRight className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
        {isSidebarOpen && (
          <div className="my-2 mt-4">
            <h1 className="text-2xl text-white font-bold">Admin Dashboard</h1>
          </div>
        )}

        <hr className="my-2" />

        <ul className="mt-3 text-white font-bold flex-grow overflow-auto">
          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdHome className="inline-block w-6 h-6 mr-2"></MdHome>
              {isSidebarOpen && <span>Home</span>}
            </a>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdDashboard className="inline-block w-6 h-6 mr-2"></MdDashboard>
              {isSidebarOpen && <span>Dashboard</span>}
            </a>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdAddBox className="inline-block w-6 h-6 mr-2"></MdAddBox>
              {isSidebarOpen && <span>Services</span>}
            </a>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdEventNote className="inline-block w-6 h-6 mr-2"></MdEventNote>
              {isSidebarOpen && <span>Appointment</span>}
            </a>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdRateReview className="inline-block w-6 h-6 mr-2"></MdRateReview>
              {isSidebarOpen && <span>Reviews</span>}
            </a>
          </li>

          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdSettings className="inline-block w-6 h-6 mr-2"></MdSettings>
              {isSidebarOpen && <span>Settings</span>}
            </a>
          </li>
        </ul>

        <ul className="mt-auto text-white font-bold">
          <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
            <a href="#" className="px-3 flex items-center">
              <MdLogout className="inline-block w-6 h-6 mr-2"></MdLogout>
              {isSidebarOpen && <span>Logout</span>}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;