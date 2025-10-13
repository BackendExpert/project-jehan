import React, { useState, useEffect, useRef } from "react";
import {
    Menu,
    Search,
    Bell,
    MessageCircle,
    ChevronDown,
    User,
    Settings,
    LogOut,
} from "lucide-react";
import defultUser from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../../service/api";

const DashNav = ({ onMenuClick }) => {
    const { auth, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [MyProfileImage, setMyProfileImage] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // useEffect(() => {
    //     const fetchmyprofileimage = async () => {
    //         try {
    //             const res = await API.get(`/member/get-myprofileimage?nocache=${Date.now()}`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             setMyProfileImage(
    //                 Array.isArray(res.data.result) ? res.data.result : [res.data.result]
    //             );
    //         } catch {
    //             setMyProfileImage([]);
    //         }
    //     };
    //     fetchmyprofileimage();
    // }, [token]);

    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-purple-200">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                {/* Left */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onMenuClick}
                        className="p-2 rounded-lg text-purple-700 hover:bg-purple-100 lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="hidden md:flex items-center bg-white border border-purple-200 rounded-xl px-3 py-2 w-72 shadow-sm hover:shadow-md transition">
                        <Search className="text-purple-500 w-5 h-5 mr-2" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="bg-transparent focus:outline-none w-full text-sm text-purple-700 placeholder-purple-400"
                        />
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6">
                    <Link to="/Dashboard/notifications">
                        <button className="relative text-purple-700 hover:text-purple-900 transition-transform hover:scale-110">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                3
                            </span>
                        </button>
                    </Link>

                    <button className="relative text-purple-700 hover:text-purple-900 transition-transform hover:scale-110">
                        <MessageCircle className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                            5
                        </span>
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-3 focus:outline-none hover:bg-purple-50 rounded-xl px-3 py-2 transition"
                        >
                            <img
                                src={
                                    MyProfileImage[0]?.profile_image
                                        ? `${import.meta.env.VITE_APP_API}/uploads/${MyProfileImage[0].profile_image}`
                                        : defultUser
                                }
                                alt="User"
                                className="h-10 w-10 border-2 border-purple-500 rounded-full shadow-sm"
                            />
                            <div className="hidden sm:block text-left">
                                <p className="text-purple-700 font-semibold text-sm">
                                    {auth?.user?.username}
                                </p>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 text-purple-600 transition-transform duration-300 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {open && (
                            <div className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-md border border-purple-200 rounded-lg shadow-lg animate-fadeIn z-50">
                                <ul className="py-2 text-sm text-purple-700">
                                    <li>
                                        <Link to="/Dashboard/profile">
                                            <button className="flex items-center w-full px-4 py-2 hover:bg-purple-100 rounded-lg transition">
                                                <User className="w-4 h-4 mr-2" /> Profile
                                            </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <button className="flex items-center w-full px-4 py-2 hover:bg-purple-100 rounded-lg transition">
                                            <Settings className="w-4 h-4 mr-2" /> Settings
                                        </button>
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

export default DashNav;
