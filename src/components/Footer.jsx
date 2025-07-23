import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <div className="text-center md:text-left">
          <img
            className="w-50 h-20 object-cover"
            src="/images/codeblue-logo-2.png"
            alt="Code Blue Logo"
          />
        </div>

        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            About
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            Contact
          </a>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-4 text-gray-400">
        &copy; {new Date().getFullYear()} MaFia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
