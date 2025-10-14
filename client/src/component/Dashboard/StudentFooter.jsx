import React from "react";

const StudentFooter = () => {
    return (
        <footer className="border-t border-purple-200 bg-white/70 backdrop-blur-md shadow-inner mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-purple-700">
                <p>© {new Date().getFullYear()} Student Dashboard. All rights reserved.</p>
                <p className="mt-2 sm:mt-0 text-purple-500">
                    Crafted with 💜 by{" "} JehanKandy
                </p>
            </div>
        </footer>
    );
};

export default StudentFooter;
