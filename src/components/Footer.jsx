import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#043927] text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Social */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              className="h-20 w-auto mb-4"
              src="/images/codeblue-logo-2.png"
              alt="Code Blue Logo"
            />
            <p className="text-gray-300 text-sm text-center sm:text-left mb-4">
              Your trusted access to fast and immediate medical aid when it
              matters most.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-blue-400",
                },
                {
                  icon: <FaTwitter className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-sky-400",
                },
                {
                  icon: <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-pink-400",
                },
                {
                  icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
                  color: "hover:text-blue-300",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 transition-colors duration-200 ${social.color}`}
                  aria-label={`Social media ${index}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MdEmail className="text-[#66c68c] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-300 text-xs sm:text-sm break-all">
                    contact@codeblue.com
                  </span>
                </div>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MdPhone className="text-[#66c68c] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-300 text-xs sm:text-sm">
                    +233 2411 856 35
                  </span>
                </div>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MdLocationOn className="text-[#66c68c] w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-gray-300 text-xs sm:text-sm">
                    19 Nii Adjei Onano St, Accra
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold mb-3 text-white">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mb-3">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full rounded sm:rounded-l-lg sm:rounded-r-none focus:outline-none text-gray-800 text-xs sm:text-sm"
              />
              <button className="bg-[#00853e] hover:bg-[#006f34] text-white px-3 py-2 rounded sm:rounded-r-lg sm:rounded-l-none text-xs sm:text-sm font-medium transition-colors mt-2 sm:mt-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#00853e]/30 text-center text-xs sm:text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} CodeBlue. All rights reserved.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
