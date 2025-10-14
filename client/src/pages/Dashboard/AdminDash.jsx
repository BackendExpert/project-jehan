import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FaUsers, FaClipboardList, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa6';
import API from '../../service/api';
import CountUp from 'react-countup';



const AdminDash = () => {
    const token = localStorage.getItem("token");
    const [activities, setActivities] = useState([]);
    const [allNotes, setAllNotes] = useState([])
    const [users, setUsers] = useState([])

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


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await API.get(`/note?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllNotes(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch notes:", err);
                setAllNotes([]);
            }
        };
        fetchNotes();
    }, [token]);


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


    const stats = [
        { title: 'Users', value: users.length, icon: <FaUsers size={24} /> },
        { title: 'Activities', value: activities.length, icon: <FaClipboardList size={24} /> },
        { title: 'Notes', value: allNotes.length, icon: <FaFile size={24} /> },
    ];

    return (
        <div className="p-6 min-h-screen text-purple-500">
            <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white text-purple-700 rounded-xl p-6 flex items-center justify-between shadow-lg hover:shadow-2xl transition duration-300"
                    >
                        <div>
                            <h2 className="text-sm font-medium">{stat.title}</h2>
                            <p className="text-2xl font-bold mt-2"><CountUp end={stat.value} duration={5}/></p>
                        </div>
                        <div className="bg-purple-200 p-3 rounded-full">{stat.icon}</div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminDash;
