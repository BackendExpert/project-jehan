import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdSettings,
    MdLogout,
    MdHistory,
} from "react-icons/md";
import {
    FaUserShield,
    FaChevronDown,
    FaChevronUp,
    FaUsers,
    FaUserGraduate,
} from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import defultImg from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";
import API from "../../service/api";

const DashSide = ({ closeSidebar }) => {
    const { auth, logout } = useAuth();
    const [openMenu, setOpenMenu] = useState(null);
    const [MyProfileImage, setMyProfileImage] = useState([]);
    const token = localStorage.getItem("token");

    const toggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    useEffect(() => {
        const fetchmyprofileimage = async () => {
            try {
                const res = await API.get(`/member/get-myprofileimage?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyProfileImage(
                    Array.isArray(res.data.result) ? res.data.result : [res.data.result]
                );
            } catch (err) {
                console.error("Failed to fetch roles:", err);
            }
        };
        fetchmyprofileimage();
    }, [token]);

    const menuItems = [
        { link: "/Dashboard", name: "Overview", icon: <MdDashboard /> },
        {
            name: "User Management",
            icon: <FaUserShield />,
            submenu: [
                { link: "/Dashboard/manage-roles", name: "Users", icon: <FaUsers /> },
                { link: "/Dashboard/permissions", name: "Permissions", icon: <FaBalanceScale /> },
            ],
        },
        {
            name: "Notes Management",
            icon: <FaUserGraduate />,
            submenu: [
                { link: "/Dashboard/interns", name: "Notes", icon: <MdSettings /> },
            ],
        },
        {
            name: "Analytics",
            icon: <MdHistory />,
            submenu: [
                { link: "/Dashboard/activities", name: "Activity Logs", icon: <MdHistory /> },
            ],
        },
    ];

    return (
        <aside className="h-full flex flex-col bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg backdrop-blur-xl w-full">
            {/* Header */}
            <div className="flex flex-col items-center py-6 border-b border-purple-500/40">
                <h1 className="text-lg font-extrabold tracking-wide">Note Management</h1>
            </div>

            {/* Profile */}
            <div className="px-6 py-6 border-b border-purple-500/30 bg-purple-800/50">
                <div className="flex items-center gap-4">
                    <img
                        src={
                            MyProfileImage[0]?.profile_image
                                ? `${import.meta.env.VITE_APP_API}/uploads/${MyProfileImage[0].profile_image}`
                                : defultImg
                        }
                        alt="User"
                        className="w-12 h-12 rounded-full border-2 border-purple-300 shadow-md"
                    />
                    <div>
                        <h2 className="text-sm font-bold">{auth.user?.username || "User"}</h2>
                        <p className="text-purple-300 text-xs uppercase">{auth?.role}</p>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-3 mt-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-900/20">
                {menuItems.map((item, index) => (
                    <div key={index}>
                        {!item.submenu ? (
                            <NavLink
                                to={item.link}
                                onClick={closeSidebar}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-white/20 text-white shadow-md"
                                        : "hover:bg-white/10 hover:text-purple-200"
                                    }`
                                }
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm">{item.name}</span>
                            </NavLink>
                        ) : (
                            <>
                                <button
                                    onClick={() => toggleMenu(index)}
                                    className={`w-full flex justify-between px-4 py-3 rounded-xl transition-all duration-300 ${openMenu === index
                                            ? "bg-white/20 text-white"
                                            : "hover:bg-white/10 hover:text-purple-200"
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    {openMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openMenu === index && (
                                    <div className="ml-6 mt-2 space-y-1">
                                        {item.submenu.map((sub, subIndex) => (
                                            <NavLink
                                                key={subIndex}
                                                to={sub.link}
                                                onClick={closeSidebar}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
                                                        ? "bg-purple-500/30 text-white"
                                                        : "hover:bg-purple-500/20"
                                                    }`
                                                }
                                            >
                                                <span>{sub.icon}</span>
                                                <span className="text-sm">{sub.name}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 mt-6 text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300 font-medium"
                >
                    <MdLogout className="text-lg" />
                    <span className="text-sm">Logout</span>
                </button>
            </nav>

            {/* Footer */}
            <div className="p-4 text-center text-xs text-purple-300 border-t border-purple-600/40">
                © {new Date().getFullYear()} Note Management
            </div>
        </aside>
    );
};

export default DashSide;
