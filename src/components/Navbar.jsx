import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#212C3D]/95    p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Logo */}
         {/* Company Logo */}
        <div className="md:col-span-2 flex justify-center md:justify-start mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-[#4CAF50] tracking-wide">MaFia</h2>
        </div>

        {/* Right Section: Home and Signup Links */}
        <div className="flex space-x-6 ">
          <Link
            to="/"
            className=" text-white hover:text-[#4CAF50] font-semibold text-lg transition-colors duration-300"
          >
            Home
          </Link>

           <Link
            to="/"
            className=" text-white hover:text-[#4CAF50] font-semibold text-lg transition-colors duration-300"
          >
            Services
          </Link>

          <Link
            to="/signup"
            className=" text-white  hover:text-[#4CAF50] font-semibold text-lg transition-colors duration-300"
          >
            Signup
          </Link>

<Link
            to="/signup"
            className=" text-white hover:text-[#4CAF50] font-semibold text-lg transition-colors duration-300 border-2 border-blue-500  px-2 rounded-2xl"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
