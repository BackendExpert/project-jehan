import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { IoMdClose } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const auth = useAuth()

    return (
        <nav className="bg-gradient-to-r from-pink-600 to-red-500 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo / Brand */}
                <div className="text-white text-2xl font-semibold">
                    <a href="/" className=""><span className='md:block hidden'>Stundent Note Management</span> <span className='md:hidden block'>SNM</span></a>
                </div>

                {/* Menu (Desktop) */}
                <div className="hidden md:flex space-x-8">
                    <a href="/" className="text-white block hover:text-pink-200 transition">Home</a>
                    <a href="/how-to-use" className="text-white block hover:text-pink-200 transition">Introductions</a>

                    {
                        auth.user ?
                            <>
                                <a href="/Dashboard" className="text-white block hover:text-pink-200 transition">Dashboard</a>
                            </>
                            :
                            <>
                                <a href="/login" className="text-white block hover:text-pink-200 transition">Login</a>
                                <a href="/create-account" className="text-white block hover:text-pink-200 transition">Registation</a>
                            </>
                    }

                </div>

                {/* Social Media (Desktop) */}
                <div className="hidden md:flex space-x-4">
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

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu} className="text-white">
                        {isMobileMenuOpen ? <IoMdClose className='h-6 w-auto' /> : <IoMenuSharp className='h-6 w-auto' />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Visible when screen size is small) */}
            <div
                className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <div className="bg-gradient-to-r from-pink-600 to-red-500 p-4 space-y-4">
                    <a href="/" className="text-white block hover:text-pink-200 transition">Home</a>
                    <a href="/how-to-use" className="text-white block hover:text-pink-200 transition">Introductions</a>
                    <a href="/login" className="text-white block hover:text-pink-200 transition">Login</a>
                    <a href="/registation" className="text-white block hover:text-pink-200 transition">Registation</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
