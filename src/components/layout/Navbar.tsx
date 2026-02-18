'use client';

import React, { useEffect, useState } from 'react';
import { Bell, Search, User, ChevronDown, Menu } from 'lucide-react';

interface NavbarProps {
    onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    return (
        <header className="h-20 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                    <Menu size={24} />
                </button>

                <div className="relative w-full max-w-md hidden md:block">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Search for exams, courses, or results..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                <button className="relative p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Bell size={22} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {user?.name || 'Loading...'}
                        </p>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                            {user?.role || 'STUDENT'}
                        </p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-primary-600 to-indigo-600 flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-md">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown size={14} className="text-gray-400 group-hover:text-primary-600 transition-colors hidden sm:block" />
                </div>
            </div>
        </header>
    );
};
