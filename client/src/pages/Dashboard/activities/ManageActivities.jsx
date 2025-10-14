import React, { useEffect, useState } from "react";
import API from "../../../service/api";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const ManageActivities = () => {
    const token = localStorage.getItem("token");
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const notesPerPage = 15;

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await API.get(`/admin/all-activities?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setActivities(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch activities:", err);
                setActivities([]);
            }
        };
        fetchActivities();
    }, [token]);

    const filteredActivities = activities.filter((act) =>
        act.user?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = filteredActivities.slice(indexOfFirstNote, indexOfLastNote);
    const totalPages = Math.ceil(filteredActivities.length / notesPerPage);

    return (
        <div className="p-4 md:p-8 min-h-[85vh] md:w-auto w-screen md:rounded-2xl shadow-xl border border-purple-100">
            {/* Header & Search */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-3xl font-extrabold text-purple-800 tracking-tight">
                    Manage Activities asd
                </h2>

                <div className="relative flex items-center w-full md:w-80">
                    <FaSearch className="absolute left-3 text-purple-500" />
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-purple-200 rounded-xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>
            </div>

            {/* Responsive table wrapper */}
            <div className="overflow-x-auto w-full rounded-xl border border-purple-200 shadow-md bg-white">
                <table className="min-w-[700px] md:min-w-full divide-y divide-purple-200">
                    <thead className="bg-purple-200 sticky top-0 z-10">
                        <tr>
                            {["#", "User", "Action", "IP Address", "Timestamp", "View"].map((head) => (
                                <th
                                    key={head}
                                    className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-purple-800 uppercase whitespace-nowrap"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-purple-100 text-sm md:text-base">
                        {currentNotes.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 whitespace-nowrap">
                                    No activities found.
                                </td>
                            </tr>
                        ) : (
                            currentNotes.map((act, idx) => (
                                <tr key={act._id} className="hover:bg-purple-50 transition-all">
                                    <td className="px-4 md:px-6 py-3 text-purple-700 font-medium whitespace-nowrap">
                                        {idx + 1 + (currentPage - 1) * notesPerPage}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 text-purple-800 font-semibold whitespace-nowrap">
                                        {act.user?.username || "N/A"}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 text-purple-700 whitespace-nowrap">{act.action}</td>
                                    <td className="px-4 md:px-6 py-3 text-purple-700 whitespace-nowrap">
                                        {act.ipAddress || act.metadata?.ipAddress || "—"}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 text-purple-700 whitespace-nowrap">
                                        {new Date(act.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 md:px-6 py-3 whitespace-nowrap">
                                        <a
                                            href={`/Dashboard/view-activity/${act._id}`}
                                            className="text-purple-600 hover:text-purple-800 font-semibold transition-all"
                                        >
                                            View →
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-xl font-medium shadow-sm transition disabled:opacity-50"
                >
                    <FaChevronLeft className="mr-2" /> Previous
                </button>

                <div className="text-purple-800 font-semibold tracking-wide">
                    Page{" "}
                    <span className="font-bold text-purple-900">{currentPage}</span> of {totalPages}
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 bg-purple-200 hover:bg-purple-300 text-purple-800 rounded-xl font-medium shadow-sm transition disabled:opacity-50"
                >
                    Next <FaChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );
};

export default ManageActivities;
