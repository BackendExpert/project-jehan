import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, ChevronDown, LogOut, User } from "lucide-react";
import defultUser from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";

const StudentNav = () => {
    const { auth, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Handle click outside for dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md border-b border-purple-200">
            <div className="flex items-center justify-between px-4 lg:px-8 py-3">
                {/* Left: Logo */}
                <Link to="/student-dashboard" className="text-xl font-extrabold text-purple-700">
                    🎓 MyPortal
                </Link>

                {/* Right: User Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative text-purple-700 hover:text-purple-900 transition-transform hover:scale-110">
                        <Bell className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            2
                        </span>
                    </button>

                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-purple-200 hover:shadow-sm transition"
                        >
                            <img
                                src={defultUser}
                                alt="User"
                                className="w-10 h-10 rounded-full border-2 border-purple-500 p-1"
                            />
                            <div className="hidden sm:block text-left">
                                <p className="text-purple-700 font-semibold text-sm">
                                    {auth?.user?.username || "Student"}
                                </p>
                                <p className="text-xs text-purple-400">Student</p>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-purple-600 transition-transform duration-300 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-lg border border-purple-200 rounded-lg shadow-lg z-50">
                                <ul className="py-2 text-sm text-purple-700">
                                    <li>
                                        <Link
                                            to="/student-dashboard/profile"
                                            className="flex items-center w-full px-4 py-2 hover:bg-purple-100 rounded-lg transition"
                                        >
                                            <User className="w-4 h-4 mr-2" /> My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={logout}
                                            className="flex items-center w-full px-4 py-2 hover:bg-red-100 rounded-lg transition text-red-600"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default StudentNav;
