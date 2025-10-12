import React from "react";
import { Outlet } from "react-router-dom";
import StudentNav from "../component/Dashboard/StudentNav";
import StudentFooter from "../component/Dashboard/StudentFooter";

const StudentDashboard = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-purple-50">
            {/* Navbar */}
            <StudentNav />

            {/* Page Content */}
            <main className="flex-1 container mx-auto px-4 py-6 lg:px-10 animate-fadeIn">
                <Outlet />
            </main>

            {/* Footer */}
            <StudentFooter />
        </div>
    );
};

export default StudentDashboard;
