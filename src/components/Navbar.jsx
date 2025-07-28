import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-unt-deep py-3 shadow-md" : "bg-unt-deep py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="z-50">
          <img
            className="w-40 h-5 object-cover"
            src="/images/codeblue-logo-2.png"
            alt="Code Blue Logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about-us" onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/blogs" onClick={closeMenu}>
            Blogs
          </NavLink>
          {/* <button className="text-white hover:text-blue-200 transition-colors">
            <FaSearch className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-blue-200 transition-colors">
            <FaUserCircle className="w-6 h-6" />
          </button> */}
        </div>

        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FaTimes className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        <div
          className={`
          md:hidden fixed inset-0 bg-unt-deep/95 backdrop-blur-sm transition-all duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col items-center justify-center space-y-8 text-white
        `}
        >
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about-us" onClick={closeMenu}>
            About Us
          </NavLink>
          <NavLink to="/blogs" onClick={closeMenu}>
            Blogs
          </NavLink>

          <div className="flex gap-6 mt-8">
            <button className="text-white hover:text-blue-200 transition-colors">
              <FaSearch className="w-6 h-6" />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors">
              <FaUserCircle className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavLink = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-white font-medium hover:text-blue-200 transition-colors text-lg md:text-base"
  >
    {children}
  </Link>
);

export default Navbar;
