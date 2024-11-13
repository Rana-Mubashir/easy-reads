import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-10 px-5">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* About Section */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
                    <p className="text-gray-400">
                        Welcome to our blog! We share insights, tips, and the latest trends to keep you informed and inspired.
                    </p>
                </div>
                
                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>
                
                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Bottom Footer */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
