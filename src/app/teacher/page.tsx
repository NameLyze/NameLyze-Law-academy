'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherIndexPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            const user = JSON.parse(userData);
            if (user.role === 'TEACHER') {
                router.push('/teacher/dashboard');
                return;
            }
        }
        router.push('/login');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-[#a81c22]/20 border-t-[#a81c22] rounded-full animate-spin"></div>
        </div>
    );
}
