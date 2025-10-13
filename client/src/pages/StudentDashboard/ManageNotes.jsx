import React, { useState, useEffect, useMemo } from "react";
import DefaultButton from "../../component/Buttons/DefaultButton";
import DefaultInput from "../../component/Form/DefaultInput";
import TextAreaInput from "../../component/Form/TextAreaInput";
import FileInput from "../../component/Form/FileInput";
import { LayoutGrid, List, Trash2, Edit3, Plus, ArrowLeft, X, TrendingUp } from "lucide-react";
import API from "../../service/api";

const ManageNotes = () => {
    const [view, setView] = useState("grid");
    const token = localStorage.getItem("token");
    const [mynotes, setMynotes] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingNote, setEditingNote] = useState(null);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const notesPerPage = 9;

    // Fetch notes
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await API.get(`/note/my-notes?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMynotes(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch notes:", err);
                setMynotes([]);
            }
        };
        fetchNotes();
    }, [token]);

    // Filter notes
    const filteredNotes = useMemo(() => {
        return mynotes.filter(
            (note) =>
                note.title?.toLowerCase().includes(search.toLowerCase()) ||
                note.content?.toLowerCase().includes(search.toLowerCase())
        );
    }, [mynotes, search]);

    // Pagination logic
    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
    const startIndex = (currentPage - 1) * notesPerPage;
    const currentNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

    // Delete note (backend)
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            const res = await API.delete(`/note/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (res.data.success === true) {
                setMynotes((prev) => prev.filter((note) => note._id !== id));
                alert(res.data.message)
            } else {
                alert(res.data.message || "Failed to delete note.");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error deleting note.");
        }
    };

    // Open edit modal
    const handleEdit = (note) => {
        setEditingNote(note);
        setFile(null);
        setError(null);
    };

    // Update note
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingNote) return;

        setError(null);
        const formData = new FormData();
        formData.append("title", editingNote.title);
        formData.append("content", editingNote.content);
        if (file) formData.append("notefile", file);

        try {
            const res = await API.put(`/note/${editingNote._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success === true) {
                alert(res.data.message)
                setMynotes((prev) =>
                    prev.map((n) => (n._id === editingNote._id ? { ...n, ...editingNote } : n))
                );
                setEditingNote(null);
                setFile(null);
            } else {
                setError(res.data.message || "Failed to update note.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Error updating note.");
        }
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
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
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
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
            {currentNotes.length > 0 ? (
                <div className={`${view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}`}>
                    {currentNotes.map((note) => (
                        <div
                            key={note._id}
                            className={`backdrop-blur-sm bg-white/80 border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 ${view === "list" ? "md:flex justify-between items-center" : ""}`}
                        >
                            <div className={`${view === "list" ? "w-2/3" : ""}`}>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">{note.title}</h2>
                                <p className={`text-gray-600 text-sm ${view === "grid" ? "line-clamp-3" : ""}`}>
                                    {note.content}
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className={`flex gap-2 mt-4 ${view === "list" ? "mt-0" : "justify-end"}`}>
                                <button
                                    className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 flex items-center gap-1 transition"
                                    onClick={() => handleEdit(note)}
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
                    <p>No notes found. Try adjusting your search or create a new one!</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1.5 rounded-lg border transition ${currentPage === 1 ? "text-gray-400 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-3 py-1.5 rounded-lg border transition ${currentPage === index + 1 ? "bg-blue-500 text-white border-blue-500" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1.5 rounded-lg border transition ${currentPage === totalPages ? "text-gray-400 border-gray-200 cursor-not-allowed" : "text-gray-700 border-gray-300 hover:bg-gray-100"}`}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            {editingNote && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setEditingNote(null)}
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Edit Note</h2>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm mb-3">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleUpdate}>
                            <DefaultInput
                                label="Title"
                                name="title"
                                value={editingNote.title}
                                onChange={(e) =>
                                    setEditingNote({ ...editingNote, title: e.target.value })
                                }
                                required
                            />

                            <TextAreaInput
                                label="Content"
                                name="content"
                                rows={5}
                                value={editingNote.content}
                                onChange={(e) =>
                                    setEditingNote({ ...editingNote, content: e.target.value })
                                }
                                required
                            />

                            <FileInput
                                label="Replace File (optional)"
                                name="notefile"
                                onChange={(e) => setFile(e.target.files[0])}
                                accept=".pdf,.doc,.docx,.jpg,.png,.txt"
                            />

                            <div className="mt-6 flex justify-center">
                                <DefaultButton type="submit" label="Update Note" />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNotes;
