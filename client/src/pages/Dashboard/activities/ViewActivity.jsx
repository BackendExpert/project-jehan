import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../service/api';
import DefaultButton from '../../../component/Buttons/DefaultButton';


const ViewActivity = () => {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await API.get(`/admin/one-activity/${id}?nocache=${Date.now()}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setActivity(res.data.result);
            } catch (err) {
                console.error('Failed to fetch activity:', err);
                setActivity(null);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, [id, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-purple-400 font-semibold text-lg">
                Loading Activity...
            </div>
        );
    }

    if (!activity) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500 font-semibold text-lg">
                Activity not found!
            </div>
        );
    }

    const { user, action, description, ipAddress, userAgent, metadata, createdAt } = activity;

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-purple-600 text-center">
                Activity Details
            </h1>

            <div className="mb-6 -mt-6">
                <a href="/Dashboard/activities">
                    <DefaultButton
                        type="button"
                        label="Back to Manage activities"
                    />
                </a>
            </div>
            

            {/* User Info */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border-l-8 border-purple-500">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">User Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-semibold text-purple-600">Username:</span> {user.username}</p>
                    <p><span className="font-semibold text-purple-600">Email:</span> {user.email}</p>
                    <p><span className="font-semibold text-purple-600">Role ID:</span> {user.role}</p>
                    <p><span className="font-semibold text-purple-600">Active:</span> {user.isActive ? 'Yes' : 'No'}</p>
                    <p><span className="font-semibold text-purple-600">Email Verified:</span> {user.isEmailVerified ? 'Yes' : 'No'}</p>
                </div>
            </div>

            {/* Activity Info */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border-l-8 border-purple-400">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Activity Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-semibold text-purple-600">Action:</span> {action}</p>
                    <p><span className="font-semibold text-purple-600">Description:</span> {description}</p>
                    <p><span className="font-semibold text-purple-600">IP Address:</span> {ipAddress}</p>
                    <p><span className="font-semibold text-purple-600">User Agent:</span> {userAgent}</p>
                    <p><span className="font-semibold text-purple-600">Created At:</span> {new Date(createdAt).toLocaleString()}</p>
                </div>
            </div>

            {/* Metadata */}
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-8 border-purple-300">
                <h2 className="text-2xl font-bold mb-4 text-purple-700">Metadata</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-semibold text-purple-600">IP Address:</span> {metadata.ipAddress}</p>
                    <p><span className="font-semibold text-purple-600">User Agent:</span> {metadata.userAgent}</p>
                    <p><span className="font-semibold text-purple-600">Timestamp:</span> {new Date(metadata.timestamp).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default ViewActivity;
