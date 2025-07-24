import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#043927] text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              className="h-16 w-auto object-contain"
              src="/images/codeblue-logo-2.png"
              alt="Code Blue Logo"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted access to fast and immediate medical aid when it
              matters most.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  icon: <FaFacebook className="w-5 h-5" />,
                  color: "hover:text-blue-400",
                },
                {
                  icon: <FaTwitter className="w-5 h-5" />,
                  color: "hover:text-sky-400",
                },
                {
                  icon: <FaInstagram className="w-5 h-5" />,
                  color: "hover:text-pink-400",
                },
                {
                  icon: <FaLinkedin className="w-5 h-5" />,
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
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about-us" },
                { label: "Services", href: "/services" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MdEmail className="w-5 h-5 mt-0.5 text-[#66c68c]" />
                <span className="text-gray-300 text-sm">
                  contact@codeblue.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MdPhone className="w-5 h-5 mt-0.5 text-[#66c68c]" />
                <span className="text-gray-300 text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 text-[#66c68c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-300 text-sm">
                  123 Medical Drive, Health City
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Stay Updated
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800 text-sm"
              />
              <button className="bg-[#00853e] hover:bg-[#006f34] text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#00853e]/30 text-center text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} CodeBlue. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-4 text-xs">
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
