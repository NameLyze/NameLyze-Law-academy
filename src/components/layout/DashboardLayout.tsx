'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { GlobalHeader } from './GlobalHeader';
import { clsx } from 'clsx';

interface DashboardLayoutProps {
    children: React.ReactNode;
    allowedRoles?: ('STUDENT' | 'TEACHER' | 'ADMIN')[];
}

export default function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData || token === 'undefined' || userData === 'undefined') {
            router.push('/login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
                // Redirect to their own dashboard if they don't have access
                if (parsedUser.role === 'ADMIN') router.push('/admin/dashboard');
                else if (parsedUser.role === 'TEACHER') router.push('/teacher/dashboard');
                else router.push('/student/dashboard');
                return;
            }

            setLoading(false);
        } catch (error) {
            console.error('Invalid user data', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        }
    }, [router, allowedRoles, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#a81c22]/20 border-t-[#a81c22] rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden text-gray-900">
            <GlobalHeader />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all duration-300"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <div className={clsx(
                    "fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white border-r border-gray-100",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <Sidebar role={user.role} onClose={() => setIsSidebarOpen(false)} />
                </div>

                <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gray-50">
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
