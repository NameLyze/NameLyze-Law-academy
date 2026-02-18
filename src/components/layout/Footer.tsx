'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Facebook,
    Youtube,
    Instagram,
    MapPin,
    Phone,
    Mail
} from 'lucide-react';

export const Footer = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const data = await res.json();
                    setSettings(data);
                }
            } catch (error) {
                console.error('Failed to fetch settings', error);
            }
        };
        fetchSettings();
    }, []);

    const siteName = settings?.siteName || 'NAMELYZE LAW';
    const siteTagline = settings?.siteTagline || 'The Law Education Expert';
    const sitePhone = settings?.contactPhone || '০১৬২২-২৪১০০৪';
    const siteEmail = settings?.contactEmail || 'info@namelyze.com';
    const siteAddress = settings?.address || 'রুম নং- ২১৯, ৩য় তলা (লিফট-২), আরএইচ-হোম সেন্টার,\n ৭৪/বি/১, গ্রিন রোড, ফার্মগেট, ঢাকা।';

    return (
        <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 border-t-4 border-[#a81c22]">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-20">
                <div className="md:col-span-2 space-y-8">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#a81c22] rounded flex items-center justify-center text-white italic font-black text-2xl">
                                {siteName.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-black text-white leading-none tracking-tight uppercase">{siteName}</h1>
                                <span className="text-[10px] font-bold text-[#f39c12] mt-1 uppercase tracking-widest leading-none">{siteTagline}</span>
                            </div>
                        </Link>
                        <h4 className="text-2xl font-black italic border-l-4 border-[#a81c22] pl-4 mt-4">আমাদের সম্পর্কে</h4>
                        <p className="text-gray-400 font-bold italic leading-relaxed max-w-md">
                            Namelyze Law Academy একটি ব্যতিক্রমধর্মী আইন শিক্ষা প্রতিষ্ঠান। দীর্ঘ ৯ বছর ধরে সুনামের সাথে সেবা চালিয়ে যাচ্ছি। যার ফলাফল স্বরূপ অত্র একাডেমি সহকারী জজ নিয়োগ পরীক্ষায় যেমন সফল, এডভোকেসিতেও তেমনি সফল!
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href={settings?.facebookUrl || '#'} className="w-12 h-12 bg-[#a81c22] hover:bg-white hover:text-[#a81c22] rounded-full flex items-center justify-center transition-all shadow-lg shadow-red-900/20"><Facebook size={24} fill="currentColor" /></Link>
                        <Link href={settings?.youtubeUrl || '#'} className="w-12 h-12 bg-[#e74c3c] hover:bg-white hover:text-[#e74c3c] rounded-full flex items-center justify-center transition-all shadow-lg shadow-red-900/20"><Youtube size={24} fill="currentColor" /></Link>
                        <Link href={settings?.instagramUrl || '#'} className="w-12 h-12 bg-white/10 hover:bg-white hover:text-[#a81c22] rounded-full flex items-center justify-center transition-all shadow-lg"><Instagram size={24} /></Link>
                    </div>
                </div>

                <div className="space-y-8">
                    <h4 className="text-xl font-black italic border-l-4 border-[#a81c22] pl-4 uppercase tracking-widest">লিঙ্ক সমূহ</h4>
                    <ul className="space-y-4">
                        {[
                            { name: 'About Us', path: '/about' },
                            { name: 'Courses', path: '/courses' },
                            { name: 'Admission', path: '/admission' },
                            { name: 'Books', path: '/books' },
                            { name: 'Gallery', path: '/gallery' }
                        ].map(l => (
                            <li key={l.name}><Link href={l.path} className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-2 group italic">
                                <span className="w-1.5 h-1.5 bg-[#a81c22] rounded-full group-hover:scale-150 transition-all"></span> {l.name}
                            </Link></li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <h4 className="text-xl font-black italic border-l-4 border-[#a81c22] pl-4 uppercase tracking-widest">যোগাযোগ</h4>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 italic group">
                            <MapPin size={24} className="text-[#a81c22] shrink-0 group-hover:scale-110 transition-transform" />
                            <address className="not-italic text-sm font-bold text-gray-400 leading-relaxed whitespace-pre-line">
                                {siteAddress}
                            </address>
                        </li>
                        <li className="flex items-center gap-4 italic text-sm font-bold text-gray-400 group">
                            <Phone size={20} className="text-[#a81c22] group-hover:rotate-12 transition-transform" strokeWidth={3} /> {sitePhone}
                        </li>
                        <li className="flex items-center gap-4 italic text-sm font-bold text-gray-400 group">
                            <Mail size={20} className="text-[#a81c22] group-hover:-translate-y-1 transition-transform" /> {siteEmail}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] text-center italic">
                    © ২০২৬ {siteName}. সর্বস্বত্ব সংরক্ষিত। Crafted by Antigravity Studio
                </p>
                <div className="flex gap-8">
                    <Link href="#" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
                    <Link href="#" className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
