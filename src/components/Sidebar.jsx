import { MdDashboard, MdAddBox, MdEventNote, MdRateReview, MdSettings, MdLogout, MdHome } from "react-icons/md";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (

  <> 
<div className="flex flex-col flex-1">
  <Navbar/>
</div>


    <div className="w-64 bg-gray-700 fixed h-screen px-4 py-2 flex flex-col mb-10"> 
      <div className="my-2 mt-4">
        <h1 className="text-2x text-white font-bold "> Admin Dashboard </h1>
      </div>

      <hr className="my-2" /> 

      <ul className="mt-3 text-white font-bold flex-grow overflow-auto"> 
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdHome className="inline-block w-6 h-6 mr-2"></MdHome>
            Home
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdDashboard className="inline-block w-6 h-6 mr-2"></MdDashboard>
            Dashboard
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdAddBox className="inline-block w-6 h-6 mr-2"></MdAddBox>
            Services
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdEventNote className="inline-block w-6 h-6 mr-2"></MdEventNote>
            Appointment
          
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdRateReview className="inline-block w-6 h-6 mr-2"></MdRateReview>
            Reviews
          </a>
        </li>

        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="#" className="px-3 flex items-center">
            <MdSettings className="inline-block w-6 h-6 mr-2"></MdSettings>
            Settings
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
    </> 
  );
};

export default Sidebar;