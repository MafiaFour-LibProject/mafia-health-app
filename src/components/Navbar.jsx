import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-gray-600 px-4 py-3 flex justify-between  ">
        {/*left side*/}

        <div className="flex items-center text-xl">
          <FaBars className="text-white me-4 cursor-pointer" />
          <span className="text-white font-semibold">MaFia</span>
        </div>

        {/*Right side*/}

        <div className="relative">
          <button className="text-white group hover:bg-gray-700 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FaUserCircle  className="w-6 mt-1 cursor-pointer"/>
            <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul>
                <li className="py-2 text-sm flex flex-col text-gray-950 hover:bg-gray-200">
                  <a href="" className="hover:bg-blue-500">Profile</a>
                  <a href="" className="hover:bg-blue-500">Settings</a>
                  <a href="" className="hover:bg-blue-500">Logout</a>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
