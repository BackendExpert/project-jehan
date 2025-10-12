import React from "react";
import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const notesData = [
    { month: "Jan", notes: 5 },
    { month: "Feb", notes: 8 },
    { month: "Mar", notes: 12 },
    { month: "Apr", notes: 7 },
    { month: "May", notes: 10 },
];

const StdDash = () => {
    return (
        <div className="flex flex-col w-full p-6">

            {/* Header */}
            <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700">
                    Notes Dashboard
                </h1>
                <p className="text-gray-500 mt-2 text-sm">
                    Track your notes activity and monthly performance
                </p>
            </motion.div>

            {/* Notes Summary Card */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                <div className="flex flex-col items-center justify-center p-6 border-t-4 border-purple-600 rounded-md bg-white">
                    <FaClipboardList className="text-purple-600 text-4xl mb-3" />
                    <p className="text-gray-700 uppercase text-xs tracking-wider">Total Notes</p>
                    <p className="text-2xl font-bold text-purple-700 mt-1">24</p>
                </div>
            </motion.div>

            {/* Notes Chart */}
            <motion.div
                className="p-6 border-l-4 border-purple-600 bg-white rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <h2 className="text-lg font-semibold text-purple-700 mb-4">Notes Added per Month</h2>
                <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={notesData}>
                            <XAxis dataKey="month" stroke="#7c3aed" />
                            <YAxis stroke="#7c3aed" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#f9f9f9",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "6px",
                                    color: "#111827",
                                    fontSize: "12px"
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="notes"
                                stroke="#7c3aed"
                                strokeWidth={3}
                                dot={{ r: 5, fill: "#7c3aed" }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default StdDash;
