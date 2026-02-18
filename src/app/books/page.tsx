'use client';

import React from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import {
    ChevronRight,
    Search,
    ShoppingBag,
    Star,
    MessageSquare
} from 'lucide-react';

export default function BooksPage() {
    const books = [
        { title: 'Bar Council Essential 2024', price: '৳ ৪৫০', tag: 'Best Seller', rating: 5, category: 'Bar council' },
        { title: 'Judiciary Preli Masters', price: '৳ ৬৫০', tag: 'New Arrival', rating: 4, category: 'Judiciary' },
        { title: 'Legal Drafting Guide', price: '৳ ৩৫০', tag: 'Utility', rating: 5, category: 'Practice' },
        { title: 'CPC Mastery Notes', price: '৳ ২০০', tag: 'Handmade', rating: 5, category: 'Academic' },
    ];

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-24 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="text-xs font-bold text-gray-400 hover:text-[#a81c22] transition-colors uppercase tracking-widest">Home</Link>
                            <ChevronRight size={14} className="text-gray-300" />
                            <span className="text-xs font-black text-[#a81c22] uppercase tracking-widest italic">Publications</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black text-gray-900 italic uppercase tracking-tighter leading-none">Namelyze <br /><span className="text-[#a81c22]">বুক স্টোর</span></h1>
                        <p className="text-lg text-gray-400 font-bold italic max-w-md">আপনার প্রস্তুতির জন্য প্রয়োজনীয় সকল আইন বিষয়ক বই ও হ্যান্ডনোট এখন এখানেই।</p>
                    </div>
                    <div className="relative group">
                        <div className="relative z-10 p-10 bg-white rounded-[3rem] shadow-2xl border border-gray-50 space-y-6 transform group-hover:rotate-1 transition-transform duration-700">
                            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                <Search className="text-gray-400" />
                                <input type="text" placeholder="বইয়ের নাম দিয়ে সার্চ করুন..." className="bg-transparent border-none focus:outline-none w-full font-bold text-sm" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['MCQ', 'Written', 'Viva', 'Notes', 'Law Journal'].map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#a81c22] hover:text-white transition-all cursor-pointer">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#a81c22] to-transparent opacity-10 blur-3xl -z-10 animate-pulse"></div>
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books.map((book, i) => (
                        <div key={i} className="group flex flex-col pt-12">
                            <div className="relative aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden flex items-center justify-center border border-gray-100 shadow-sm group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                                <span className="text-gray-200 font-black italic uppercase text-xl opacity-20 text-center px-6">Namelyze <br />Book Cover {i + 1}</span>
                                <div className="absolute top-6 right-6 px-4 py-1.5 bg-white text-gray-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-xl">
                                    {book.tag}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-center">
                                    <button className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[9px]">
                                        <ShoppingBag size={14} className="text-[#a81c22]" /> Add to Bag
                                    </button>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, j) => (
                                            <Star key={j} size={10} fill={j < book.rating ? "#f39c12" : "transparent"} className={j < book.rating ? "text-[#f39c12]" : "text-gray-400"} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-1">
                                <span className="text-[9px] font-black text-[#a81c22] uppercase tracking-[0.2em]">{book.category}</span>
                                <h3 className="text-lg font-black text-gray-900 italic tracking-tight">{book.title}</h3>
                                <p className="text-2xl font-black text-gray-900 italic">{book.price}</p>
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
