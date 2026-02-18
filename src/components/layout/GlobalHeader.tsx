'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Phone,
    Facebook,
    Youtube,
    Instagram,
    Linkedin,
    Menu,
    X,
    User,
    GraduationCap,
    Search
} from 'lucide-react';

export const GlobalHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT US', path: '/about' },
        { name: 'COURSES', path: '/courses' },
        { name: 'NOTICE', path: '/notice' },
        { name: 'PHOTO GALLERY', path: '/gallery' },
        { name: 'VIDEO', path: '/video' },
        { name: 'BOOK', path: '/books' },
    ];

    const siteName = settings?.siteName || 'NAMELYZE LAW';
    const sitePhone = settings?.contactPhone || '+8801622-241004';

    return (
        <>
            {/* Top Bar */}
            <div className="bg-[#a81c22] py-2.5 text-white text-[12px] font-medium border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 font-bold">
                        <Phone size={12} fill="white" className="rotate-90" />
                        Hotline: {sitePhone}
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="flex gap-4">
                            <Link href={settings?.facebookUrl || '#'} className="hover:opacity-80 transition-opacity"><Facebook size={14} fill="white" /></Link>
                            <Link href={settings?.instagramUrl || '#'} className="hover:opacity-80 transition-opacity"><Instagram size={14} fill="white" /></Link>
                            <Link href={settings?.youtubeUrl || '#'} className="hover:opacity-80 transition-opacity"><Youtube size={14} fill="white" /></Link>
                            <Link href={settings?.linkedinUrl || '#'} className="hover:opacity-80 transition-opacity"><Linkedin size={14} fill="white" /></Link>
                        </div>
                        <div className="h-4 w-[1px] bg-white/30 hidden sm:block"></div>
                        <div className="flex items-center gap-4">
                            <Link href="/admission" className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
                                <GraduationCap size={14} /> Admission
                            </Link>
                            <Link href="/login" className="flex items-center gap-1.5 hover:text-gray-200 transition-colors">
                                <User size={14} /> Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white'}`}>
                <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative h-14 w-14">
                            <div className="absolute inset-0 border-2 border-[#1a4d2e] rounded-full flex items-center justify-center p-1">
                                <div className="bg-[#1a4d2e] w-full h-full rounded-full flex items-center justify-center">
                                    <GraduationCap size={24} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-black tracking-tight text-[#1a4d2e] leading-none uppercase">
                                {siteName.split(' ')[0]} <span className="text-[#e67e22]">{siteName.split(' ').slice(1).join(' ')}</span>
                            </h1>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`px-4 py-3 text-[13px] font-bold transition-colors text-gray-600 hover:text-[#1a4d2e]`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Dynamic Marquee */}
            {settings?.marqueeText && (
                <div className="bg-gray-900 overflow-hidden py-2 border-y border-white/5">
                    <div className="flex whitespace-nowrap animate-marquee">
                        <span className="text-white text-xs font-bold uppercase italic tracking-widest px-4">
                            {settings.marqueeText} • {settings.marqueeText} • {settings.marqueeText} • {settings.marqueeText}
                        </span>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[150] bg-white pt-24 px-6 lg:hidden overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-black text-gray-900 border-b-2 border-gray-100 pb-4 uppercase italic tracking-tighter"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
