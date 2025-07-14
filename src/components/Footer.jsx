import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#212C3D] text-white py-8 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto grid grid-cols-8 gap-4 md:gap-6 lg:gap-8 items-start">

        {/* Company Logo */}
        <div className="md:col-span-2 flex justify-center md:justify-start mb-6 md:mb-0">
          <h2 className="text-4xl font-bold text-[#4CAF50] tracking-wide">MaFia</h2>
        </div>

        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Company Info</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Press & Media</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Find Healthcare Providers</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Book Consultations</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Insurance Coverage</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Terms Of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3">Social Media</h3>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition-colors duration-300">Facebook</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">X</a></li>
            <li><a href="#" className="hover:text-white transition-colors duration-300">Instagram</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-6 lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-0">
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-gray-300 mb-3 max-w-xs text-sm">
            Stay informed! Sign up for our newsletter and get the latest healthcare tips, updates, and exclusive LifeLyn features.
          </p>
          <form className="w-full max-w-sm">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow p-2 rounded-md bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-lg transition-colors duration-300 text-sm "
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
