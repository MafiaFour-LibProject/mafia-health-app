import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <img
              className="h-20 w-auto object-contain"
              src="/images/codeblue-logo-2.png"
              alt="Code Blue Logo"
            />
          </div>

          <div className="flex justify-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/about-us"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </a>
          </div>

          <div className="flex justify-center md:justify-end space-x-6 w-full md:w-auto">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-sky-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-300 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} CodeBlue. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
