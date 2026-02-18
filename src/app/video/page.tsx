'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Play,
    Youtube,
    Eye
} from 'lucide-react';

export default function VideoPage() {
    const videos = [
        { title: 'কিভাবে বার কাউন্সিল পরীক্ষায় সফল হবেন?', views: '১০কে+', duration: '১২:৪৫' },
        { title: 'সিপিসি (CPC) এর গুরুত্বপূর্ণ ধারা সমুহ', views: '৫কে+', duration: '২৫:২০' },
        { title: 'দণ্ডবিধি (Penal Code) এর সহজ ব্যাখ্যা', views: '৮কে+', duration: '১৮:১০' },
        { title: 'ভাইভা বোর্ডে কমন ১টি প্রশ্ন ও উত্তর', views: '১৫কে+', duration: '১০:০৫' },
        { title: 'তামাদি আইন নিয়ে কিছু কথা', views: '৩কে+', duration: '১৫:৩০' },
        { title: 'জুডিশিয়ারি প্রস্তুতির সেরা গাইডলাইন', views: '২০কে+', duration: '৩০:১৫' },
    ];

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#a81c22]/5 rounded-[2rem] flex items-center justify-center text-[#a81c22] mb-8 shadow-inner border border-[#a81c22]/10 scale-110">
                        <Youtube size={36} />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-gray-900 italic uppercase tracking-tighter mb-4">ভিডিও <span className="text-[#a81c22]">লেকচার</span></h1>
                    <div className="flex items-center gap-2">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">Video Library</span>
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {videos.map((video, i) => (
                        <div key={i} className="group space-y-4">
                            <div className="relative aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden flex items-center justify-center shadow-xl group-hover:shadow-[#a81c22]/20 transition-all duration-500">
                                <div className="absolute inset-0 bg-[#a81c22]/10 opacity-40"></div>
                                <div className="z-10 w-20 h-20 bg-white text-[#a81c22] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500 shadow-2xl cursor-pointer">
                                    <Play size={32} fill="currentColor" />
                                </div>
                                <div className="absolute bottom-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-[10px] font-black tracking-widest border border-white/10">
                                    {video.duration}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="px-4 space-y-2">
                                <h3 className="text-xl font-black text-gray-900 italic transition-colors group-hover:text-[#a81c22] leading-tight cursor-pointer line-clamp-1">{video.title}</h3>
                                <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">
                                    <span className="flex items-center gap-1.5"><Eye size={14} className="text-[#a81c22]" /> {video.views} Views</span>
                                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                    <span>Added 2 Weeks Ago</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <div className="h-40"></div>
            <Footer />
        </div>
    );
}
