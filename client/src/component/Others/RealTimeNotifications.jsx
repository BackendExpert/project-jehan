import React, { useEffect, useState } from "react";
import { socket } from "../../socket";

const RealTimeNotifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("newUser", (data) => {
            console.log("New user received:", data);
            setNotifications(prev => [data, ...prev]);
        });

        return () => {
            socket.off("newUser");
        };
    }, []);

    return (
        <div className="p-4 bg-purple-50 rounded-lg max-w-md">
            <h2 className="text-lg font-bold mb-2">Real-Time User Sign-Ups</h2>
            {notifications.length === 0 && <p>No new users yet.</p>}
            <ul>
                {notifications.map((n, i) => (
                    <li key={i} className="p-2 border-b border-purple-200">
                        🎉 New user signed up: <b>{n.username}</b> ({n.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimeNotifications;
