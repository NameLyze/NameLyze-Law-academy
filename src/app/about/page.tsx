'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    Users,
    Award,
    BookOpen,
    Target,
    CheckCircle2,
    ChevronRight
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">About Us</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 italic uppercase tracking-tighter">আমাদের <span className="text-[#a81c22]">সম্পর্কে</span></h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden flex items-center justify-center border border-gray-100 shadow-xl">
                            <span className="text-gray-200 font-black italic text-4xl uppercase opacity-20">Academy Vision</span>
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-[#a81c22] p-10 rounded-3xl text-white shadow-2xl hidden md:block">
                            <h4 className="text-4xl font-black italic leading-none">৯+ বছর</h4>
                            <p className="text-xs font-black uppercase tracking-widest mt-2 opacity-80 italic">Success Journey</p>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight italic">আইন শিক্ষায় নতুন দিগন্ত উম্মোচন করছি আমরা।</h2>
                        <p className="text-lg text-gray-500 font-bold leading-relaxed italic">
                            Namelyze Law Academy একটি ব্যতিক্রমধর্মী আইন শিক্ষা প্রতিষ্ঠান। দীর্ঘ ৯ বছর ধরে সুনামের সাথে সেবা চালিয়ে যাচ্ছি। যার ফলাফল স্বরূপ অত্র একাডেমি সহকারী জজ নিয়োগ পরীক্ষায় যেমন সফল, এডভোকেসিতেও তেমনি সফল!
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { title: 'মানসম্মত শিক্ষা নিশ্চিত করা', icon: CheckCircle2 },
                                { title: 'সঠিক গাইডলাইন প্রদান করা', icon: CheckCircle2 },
                                { title: 'প্র্যাকটিক্যাল কোর্সের মাধ্যমে দক্ষতা বৃদ্ধি', icon: CheckCircle2 },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <item.icon className="text-[#a81c22]" size={24} />
                                    <span className="font-black text-gray-700 italic uppercase text-sm tracking-wide">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-24 bg-[#1a1a1a] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'শিক্ষার্থী', value: '৫০০০+', icon: Users },
                            { label: 'সাফল্যের হার', value: '৯৪%', icon: Award },
                            { label: 'কোর্সসমূহ', value: '২৫+', icon: BookOpen },
                            { label: 'লক্ষ্য', value: '১০০%', icon: Target },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-16 h-16 bg-[#a81c22] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-900/20">
                                    <stat.icon size={32} />
                                </div>
                                <h4 className="text-4xl font-black italic">{stat.value}</h4>
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="h-40"></div>
            <Footer />
        </div>
    );
}
