import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        {/* Brand */}
        <div className="text-center md:text-left">
          <img
            className="h-30 w-30 bg-gray-800 rounded-full"
            src="/Logo.png"
            alt="logo"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-green-400 transition">
            Home
          </a>
          <a href="#" className="hover:text-green-400 transition">
            About Us
          </a>
          <a href="#" className="hover:text-green-400 transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
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

      {/* Copyright */}
      <div className="text-center text-sm mt-4 text-white-800">
        &copy; {new Date().getFullYear()} MaFia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
