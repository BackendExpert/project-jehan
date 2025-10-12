import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
    const currentyear = new Date().getFullYear();
    return (
        <footer className="bg-gradient-to-r from-pink-600 to-red-500 text-white py-16 px-4 sm:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
                    {/* About Us */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">About Us</h3>
                        <p className="text-sm leading-relaxed">
                            Managing Notes for Students and Admins
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="/" className="hover:underline transition duration-300 ease-in-out">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:underline transition duration-300 ease-in-out">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:underline transition duration-300 ease-in-out">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/" className="hover:underline transition duration-300 ease-in-out">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                        <p className="text-sm leading-relaxed">Email: support@example.com</p>
                        <p className="text-sm leading-relaxed">Phone: +1 (800) 123-4567</p>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-6">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Facebook className="w-6 h-6 text-white hover:text-pink-200 transition duration-300" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-6 h-6 text-white hover:text-pink-200 transition duration-300" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <Twitter className="w-6 h-6 text-white hover:text-pink-200 transition duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-indigo-400 pt-6 mt-10 text-center text-sm">
                    <p>© {currentyear} Student Note Management. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
