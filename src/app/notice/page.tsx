'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Bell,
    Calendar,
    ArrowUpRight
} from 'lucide-react';

export default function NoticePage() {
    const notices = [
        { title: 'ভর্তি পরীক্ষার ফলাফল ও সিট প্ল্যান ২০২৪', date: '২০ ফেব্রুয়ারি, ২০২৪', category: 'Result' },
        { title: 'বার কাউন্সিল এমসিকিউ স্পেশাল ব্যাচে ভর্তি চলছে', date: '১৮ ফেব্রুয়ারি, ২০২৪', category: 'Admission' },
        { title: 'আগামী শুক্রবারের ক্লাস স্থগিত সংক্রান্ত নোটিশ', date: '১৫ ফেব্রুয়ারি, ২০২৪', category: 'Class' },
        { title: 'সহকারী জজ নিয়োগ পরীক্ষার ভাইভা টিপস ফাইল', date: '১০ ফেব্রুয়ারি, ২০২৪', category: 'Material' },
    ];

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 italic uppercase tracking-tighter mb-4 animate-in slide-in-from-bottom duration-700">জরিপ ও <span className="text-[#a81c22]">নোটিশ</span></h1>
                    <div className="flex items-center justify-center gap-2">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">Official Notices</span>
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-5xl mx-auto px-6">
                <div className="space-y-6">
                    {notices.map((notice, i) => (
                        <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-gray-100 rounded-3xl hover:border-[#a81c22]/20 hover:shadow-2xl transition-all duration-500 cursor-pointer">
                            <div className="flex items-center gap-6 mb-4 md:mb-0">
                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-[#a81c22] group-hover:text-white transition-all shadow-inner">
                                    <Bell size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-gray-900 italic transition-colors group-hover:text-[#a81c22]">{notice.title}</h3>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-black uppercase tracking-widest group-hover:bg-[#a81c22]/10 group-hover:text-[#a81c22] transition-colors">
                                            {notice.category}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                            <Calendar size={12} /> {notice.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-400 group-hover:bg-[#a81c22] group-hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-sm">
                                View Detail <ArrowUpRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <div className="h-40"></div>
            <Footer />
        </div>
    );
}
