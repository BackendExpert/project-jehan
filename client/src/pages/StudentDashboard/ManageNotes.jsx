import React, { useState } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import { LayoutGrid, List, Trash2, Edit3, Plus, ArrowLeft } from "lucide-react";
import API from "../../service/api";
import { useEffect } from "react";

const ManageNotes = () => {
    const [view, setView] = useState("grid"); // "grid" or "list"
    const token = localStorage.getItem("token")
    const [mynotes, setmynotes] = useState([])

    useEffect(() => {
        const fetchrequestedsheets = async () => {
            try {
                const res = await API.get(`/note/my-notes?nocache=${Date.now()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });

                setmynotes(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setmynotes([]);
            }
        };

        fetchrequestedsheets();
    }, [token]);


    const handleDelete = (id) => {
        setmynotes(mynotes.filter((note) => note._id !== id));
    };

    const handleEdit = (id) => {
        alert("Edit note: " + id);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                        Manage My Notes
                    </h1>
                    <p className="text-gray-500 mt-1">
                        View, edit, and organize your saved notes efficiently.
                    </p>
                </div>
                <div className="flex gap-3">
                    <a href="/my-account">
                        <DefaultButton
                            type="button"
                            label={
                                <div className="flex items-center gap-2">
                                    <ArrowLeft size={16} /> Back
                                </div>
                            }
                        />
                    </a>
                    <a href="/my-account/create-note">
                        <DefaultButton
                            type="button"
                            label={
                                <div className="flex items-center gap-2">
                                    <Plus size={16} /> New Note
                                </div>
                            }
                        />
                    </a>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <input
                    type="text"
                    placeholder="Search notes..."
                    className="w-full sm:w-1/3 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
                />
                <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-lg transition ${view === "grid"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        <LayoutGrid size={18} />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-lg transition ${view === "list"
                            ? "bg-white shadow-sm text-blue-600"
                            : "text-gray-500 hover:text-blue-600"
                            }`}
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>

            {/* Notes Display */}
            {mynotes.length > 0 ? (
                <div
                    className={`${view === "grid"
                        ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "flex flex-col gap-4"
                        }`}
                >
                    {mynotes.map((note) => (
                        <div
                            key={note._id}
                            className={`backdrop-blur-sm bg-white/80 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 ${view === "list" ? "flex justify-between items-center" : ""
                                }`}
                        >
                            <div className={`${view === "list" ? "w-2/3" : ""}`}>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                    {note.title}
                                </h2>
                                <p
                                    className={`text-gray-600 text-sm ${view === "grid" ? "line-clamp-3" : ""
                                        }`}
                                >
                                    {note.content}
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    {new Date(note.date).toLocaleDateString()}
                                </p>
                            </div>

                            <div
                                className={`flex gap-2 mt-4 ${view === "list" ? "mt-0" : "justify-end"
                                    }`}
                            >
                                <button
                                    className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center gap-1 transition"
                                    onClick={() => handleEdit(note._id)}
                                >
                                    <Edit3 size={14} /> Edit
                                </button>
                                <button
                                    className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-1 transition"
                                    onClick={() => handleDelete(note._id)}
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500 py-20">
                    <p>No notes yet. Click “New Note” to create your first one!</p>
                </div>
            )}
        </div>
    );
};

export default ManageNotes;
