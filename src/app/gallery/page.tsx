'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Plus,
    Maximize2
} from 'lucide-react';

export default function GalleryPage() {
    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">Photo Gallery</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 italic uppercase tracking-tighter">আমাদের স্মৃতি <span className="text-[#a81c22]">গ্যালারি</span></h1>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <div key={item} className="group relative aspect-square bg-gray-50 rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 cursor-pointer">
                            <div className="absolute inset-0 bg-[#1a4d2e] opacity-5 group-hover:opacity-0 transition-opacity"></div>
                            <div className="w-full h-full flex flex-col items-center justify-center space-y-2">
                                <span className="text-gray-200 font-black italic text-[10px] uppercase opacity-20 tracking-tighter text-center">Namelyze <br /> Moment {item}</span>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="p-4 bg-white/10 backdrop-blur-xl rounded-full text-white transform scale-50 group-hover:scale-100 transition-transform duration-500 border border-white/20">
                                    <Maximize2 size={24} />
                                </div>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest bg-[#a81c22] px-3 py-1 rounded-full w-fit">Event 2026</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="px-12 py-5 bg-[#a81c22] text-white rounded-2xl font-black italic uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-red-900/10">
                        Load More Memories
                    </button>
                </div>
            </section>
            <div className="h-40"></div>
            <Footer />
        </div>
    );
}
