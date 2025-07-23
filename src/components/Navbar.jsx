import { FaBars, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-gray-800 px-4 py-5 flex justify-between  ">
        <img
          className="w-40 h-5 object-cover"
          src="/images/codeblue-logo-2.png"
          alt="Code Blue Logo"
        />

        <div className=" relative flex  items-center justify-center gap-4">
          <Link to="/">
            <div className="text-white font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer ">
              Home
            </div>
          </Link>
          <Link to="/about-us">
            <div className="text-white font-semibold hover:underline focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer ">
              About Us
            </div>
          </Link>

          {/* <button className="text-white group hover:bg-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FaUserCircle className="w-8 mt-1 cursor-pointer" />
            <div className="z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0">
              <ul>
                <li className="py-2 text-sm flex flex-col text-gray-950 hover:bg-gray-200">
                  <a href="" className="hover:bg-blue-500">
                    Profile
                  </a>
                  <a href="" className="hover:bg-blue-500">
                    Settings
                  </a>
                  <a href="" className="hover:bg-blue-500">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </button> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
