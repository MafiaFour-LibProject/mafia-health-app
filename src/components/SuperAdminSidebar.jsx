
import { MdDashboard, MdAddHome,  MdPeople, MdAnalytics, MdLogout,} from "react-icons/md";

const SuperAdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-700 fixed h-screen px-4 py-2 flex flex-col">
      <div className="my-2 mt-4">
        <h1 className="text-xl text-white font-bold">
          {" "}
          SuperAdmin Dashboard{" "}
        </h1>
      </div>
      <hr className="my-2" /> 
      <ul className="mt-3 text-white font-bold flex-grow overflow-auto">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdDashboard className="inline-block w-6 h-6 mr-2"></MdDashboard>
            Dashboard
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdAddHome className="inline-block w-6 h-6 mr-2"></MdAddHome>
            Add Facility
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdPeople className="inline-block w-6 h-6 mr-2"></MdPeople>
            Users
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdAnalytics className="inline-block w-6 h-6 mr-2"></MdAnalytics>
            Analytics
          </a>
        </li>
      </ul>
      <ul className="mt-auto text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdLogout className="inline-block w-6 h-6 mr-2"></MdLogout>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SuperAdminSidebar;
