import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & About */}
          <div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-3">KrishiLink</h1>
            <p className="text-gray-100">
              Connecting farmers and buyers easily. Explore crops, trade, and grow together.
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
            <ul>
              <li className="mb-2 hover:text-yellow-400 cursor-pointer">Home</li>
              <li className="mb-2 hover:text-yellow-400 cursor-pointer">Crops</li>
              <li className="mb-2 hover:text-yellow-400 cursor-pointer">About</li>
              <li className="mb-2 hover:text-yellow-400 cursor-pointer">Contact</li>
            </ul>
          </div>
  
          {/* Social */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex gap-4">
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
              <FaTwitter className="hover:text-yellow-400 cursor-pointer" />
              <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
              <FaLinkedinIn className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>
        </div>
  
        <div className="border-t border-green-400 mt-10 pt-4 text-center text-gray-200 text-sm">
          © 2025 KrishiLink. All rights reserved.
        </div>
      </footer>
    );
    
};

export default Footer;