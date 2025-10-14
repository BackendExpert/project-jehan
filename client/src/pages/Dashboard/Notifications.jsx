import React from 'react';
import { FaBell, FaUser, FaCheckCircle, FaLock } from 'react-icons/fa';

const Notifications = () => {
    // Dummy data
    const dummyNotifications = [
        {
            id: 1,
            type: 'user',
            title: "New User Registered",
            description: "A new user jehanapptest@gmail.com has just registered.",
            createdAt: "2025-10-14T04:00:00Z",
        },
        {
            id: 2,
            type: 'otp',
            title: "OTP Verified",
            description: "User jehanapptest@gmail.com successfully verified OTP.",
            createdAt: "2025-10-13T22:15:00Z",
        },
        {
            id: 3,
            type: 'password',
            title: "Password Changed",
            description: "User jehanapptest@gmail.com changed password successfully.",
            createdAt: "2025-10-12T18:45:00Z",
        },
    ];

    // Choose icon based on notification type
    const getIcon = (type) => {
        switch (type) {
            case 'user': return <FaUser className="text-white" />;
            case 'otp': return <FaCheckCircle className="text-white" />;
            case 'password': return <FaLock className="text-white" />;
            default: return <FaBell className="text-white" />;
        }
    };

    return (
        <div className="p-6 md:p-10 min-h-[80vh] w-full rounded-2xl  shadow-xl border border-purple-100">
            <div className="flex items-center mb-6">
                <FaBell className="text-purple-600 text-3xl mr-3" />
                <h2 className="text-3xl md:text-4xl font-extrabold text-purple-800 tracking-tight">
                    Notifications
                </h2>
            </div>

            {dummyNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-purple-700 text-center">
                    <p className="text-lg md:text-xl font-medium">No notifications yet.</p>
                    <p className="text-sm md:text-base mt-2 text-purple-500">
                        You’re all caught up!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyNotifications.map((note) => (
                        <div
                            key={note.id}
                            className="relative p-5 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white overflow-hidden"
                        >
                            {/* Icon badge */}
                            <div className="absolute top-4 left-4 bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                                {getIcon(note.type)}
                            </div>

                            <div className="ml-16">
                                <h3 className="text-purple-800 font-bold text-lg md:text-xl mb-1">
                                    {note.title}
                                </h3>
                                <p className="text-purple-700 text-sm md:text-base mb-2">
                                    {note.description}
                                </p>
                                <span className="text-purple-500 text-xs md:text-sm">
                                    {new Date(note.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
