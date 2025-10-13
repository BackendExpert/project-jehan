import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import API from "../../../service/api";
import { FaUserCircle } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get(`/user?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load users.");
            }
        };
        fetchUsers();
    }, [token]);

    const filtered = users.filter(
        (u) =>
            u.username?.toLowerCase().includes(search.toLowerCase()) ||
            u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 md:p-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-8xl mx-auto"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-3xl font-extrabold text-purple-700">
                        Manage Users
                    </h1>
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-80 px-4 py-2 border border-purple-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
                    />
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                {/* TABLE for Desktop */}
                <div className="hidden md:block overflow-x-auto rounded-xl border border-purple-100 shadow-lg">
                    <table className="min-w-full text-sm text-gray-700">
                        <thead className="bg-purple-600 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold">#</th>
                                <th className="px-6 py-3 text-left font-semibold">Username</th>
                                <th className="px-6 py-3 text-left font-semibold">Email</th>
                                <th className="px-6 py-3 text-left font-semibold">Role</th>
                                <th className="px-6 py-3 text-left font-semibold">Email Verified</th>
                                <th className="px-6 py-3 text-left font-semibold">Status</th>
                                <th className="px-6 py-3 text-left font-semibold"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length > 0 ? (
                                filtered.map((user, i) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-purple-50 transition duration-200 border-b border-purple-200 h-14"
                                    >
                                        <td className="px-6 py-3">{i + 1}</td>
                                        <td className="px-6 py-3 font-medium flex items-center gap-2">
                                            <FaUserCircle className="text-purple-500 text-lg" />
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-3">{user.email}</td>
                                        <td className="px-6 py-3 capitalize">
                                            {user.role?.name || "N/A"}
                                        </td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${user.isEmailVerified
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {user.isEmailVerified ? "Verified" : "Unverified"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`px-3 py-1 text-xs font-semibold rounded-full ${user.isActive
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-200 text-gray-700"
                                                    }`}
                                            >
                                                {user.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <a href={`/Dashboard/update-role/${user._id}`} className="text-purple-500 hover:underline font-semibold">
                                                Action
                                            </a>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-6 text-gray-500 italic"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* CARD view for Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {filtered.length > 0 ? (
                        filtered.map((user, i) => (
                            <motion.div
                                key={user._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-md border border-purple-100 hover:shadow-lg transition"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <FaUserCircle className="text-purple-500 text-3xl" />
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {user.username}
                                        </p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-sm font-medium text-purple-700 capitalize">
                                        {user.role?.name || "N/A"}
                                    </span>
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded-full ${user.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>

                                <div className="mt-3">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${user.isEmailVerified
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {user.isEmailVerified ? "Verified Email" : "Unverified"}
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <a href={`/Dashboard/update-role/${user._id}`} className="text-purple-500 hover:underline font-semibold">
                                        Action
                                    </a>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 italic col-span-full">
                            No users found.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Showing {filtered.length} user{filtered.length !== 1 && "s"}
                </p>
            </motion.div>
        </div>
    );
};

export default ManageUsers;
