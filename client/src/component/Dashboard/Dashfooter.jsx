import React from "react";

const DashFooter = () => {
    return (
        <footer className="border-t border-purple-200 bg-white/70 backdrop-blur-md shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-purple-700">
                <p>© {new Date().getFullYear()} Student Note Management. All rights reserved.</p>
                <p className="mt-2 sm:mt-0 text-purple-500">
                    Built with ❤️ by{" "} JehanKandy
                </p>
            </div>
        </footer>
    );
};

export default DashFooter;
