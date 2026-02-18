'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    ArrowRight,
    Clock,
    Users
} from 'lucide-react';

export default function CoursesPage() {
    const courses = [
        {
            title: 'Bar Preli Revision Batch-1',
            price: '৳ ৮০০০',
            duration: '৪ মাস',
            students: '২৫০+',
            tag: 'Popular'
        },
        {
            title: ' सहायक जज्ज (Assistant Judge)',
            price: '৳ ১২০০০',
            duration: '৬ মাস',
            students: '১৫০+',
            tag: 'Executive'
        },
        {
            title: 'Advocate Enrollment Written',
            price: '৳ ৭০০০',
            duration: '৩ মাস',
            students: '৩০০+',
            tag: 'New'
        },
        {
            title: 'Bar Council Viva Special',
            price: '৳ ৫০০০',
            duration: '২ মাস',
            students: '১২০+',
            tag: 'Special'
        }
    ];

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">All Courses</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 italic uppercase tracking-tighter">আমাদের ক্যরিয়ার <span className="text-[#a81c22]">প্রোগ্রাম</span></h1>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <div key={i} className="group bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="relative h-64 bg-gray-100 flex items-center justify-center">
                                <span className="text-gray-200 font-black italic uppercase text-2xl opacity-20">Namelyze <br />Course Visual</span>
                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#a81c22] text-white text-[10px] font-black uppercase tracking-widest italic rounded-full shadow-lg">
                                    {course.tag}
                                </div>
                            </div>
                            <div className="p-10 space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 italic uppercase leading-none group-hover:text-[#a81c22] transition-colors">
                                    {course.title}
                                </h3>
                                <div className="flex items-center gap-6 py-2 border-y border-gray-50">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest italic">
                                        <Clock size={16} className="text-[#a81c22]" /> {course.duration}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest italic">
                                        <Users size={16} className="text-[#a81c22]" /> {course.students}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-3xl font-black italic text-[#a81c22]">{course.price}</span>
                                    <Link href="/admission" className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center group-hover:bg-[#a81c22] transition-all group-hover:rotate-[-45deg] shadow-lg shadow-black/10">
                                        <ArrowRight size={20} />
                                    </Link>
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
