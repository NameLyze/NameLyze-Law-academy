'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/Card';
import {
  Facebook,
  Youtube,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Play,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageSquare,
  ArrowRight,
  Gavel,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function LandingPage() {
  const [settings, setSettings] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Hero Slider State
  const defaultSlides = [
    {
      title: "ADMISSION ON!",
      subtitle: "Namelyze Law Academy",
      description: "Join our comprehensive programs for Judiciary, Bar Exam, and Law Honors.",
      items: ["- Bar Preli (MCQ)", "- Bar Written", "- BJS Preli (MCQ)", "- BJS Written"],
      color: "#a81c22",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "SUCCESS STORIES",
      subtitle: "Real Results, Real Future",
      description: "Celebrating our candidates who cleared the 16th BJS exam with excellence.",
      items: ["- 500+ Selections", "- Top Rankers", "- Expert Mentorship", "- Success Guaranteed"],
      color: "#1a4d2e",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "OFFER AVAILABLE!",
      subtitle: "Flat 50% Off",
      description: "Special discount for the upcoming Bar Preli Revision batch. Limited seats!",
      items: ["- Live Classes", "- PDF Notes", "- Mock Exams", "- 24/7 Support"],
      color: "#e67e22",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  const heroSlides = settings?.heroSliders ? JSON.parse(settings.heroSliders).map((s: any) => ({
    ...s,
    color: s.color || "#a81c22",
    items: s.items || ["Premium Legal Training", "Success Support"]
  })) : defaultSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    if (heroSlides.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [nextSlide, heroSlides.length]);

  // Success Slider State
  const [successOffset, setSuccessOffset] = useState(0);
  const successes = [
    { name: 'Maria Sultana', achievement: '16th BJS', quote: 'Thanks to Namelyze Law Academy for the support!' },
    { name: 'Khalid Hasan', achievement: '16th BJS', quote: 'The notes provided were exceptional.' },
    { name: 'Fatema Jaman', achievement: '16th BJS', quote: 'I recommend HLA to every law student.' },
    { name: 'Rubayea Yeasmin', achievement: '16th BJS', quote: 'Dynamic classes and great mentorship.' },
    { name: 'Arif Hossain', achievement: '16th BJS', quote: 'Success is within reach here.' },
    { name: 'Farzana Iva', achievement: '16th BJS', quote: 'Best academy for BJS preparation.' },
  ];

  const programs = [
    {
      title: 'সহকারী ১৮ বিজেএস প্রিলি + লিখিত কোর্স',
      desc: 'আইন ক্লাস: ৬৪টি | জেনারেল: ২২টি | মোট ক্লাস: ৮৬টি | ক্লাস টেস্ট: ২৮ টি | মডেল টেস্ট: ০৫টি',
      price: '৳ 10000.00',
      oldPrice: '৳ 12000.00',
      id: 1
    },
    {
      title: 'সহকারী বার প্রিলি (Offline) রিভিশন ব্যাচ-১',
      desc: 'ক্লাস সময়কাল: পরীক্ষা পর্যন্ত | প্রতিটি ক্লাস ২ ঘন্টা ব্যাপী | ক্লাস: ৩৬টি | ক্লাস টেস্ট: ২০টি | মডেল টেস্ট: ০৫টি',
      price: '৳ 4000.00',
      id: 2
    },
    {
      title: 'বার প্রিলি (Offline) রিভিশন ব্যাচ-২',
      desc: 'ক্লাস সময়কাল: পরীক্ষা পর্যন্ত | প্রতিটি ক্লাস ২ ঘন্টা ব্যাপী | ক্লাস: ৩৬টি | ক্লাস টেস্ট: ২০টি | মডেল টেস্ট: ০৫টি',
      price: '৳ 4000.00',
      id: 3
    },
    {
      title: 'বার ”লিখিত” পরীক্ষা প্রস্তুতি অফলাইন ব্যাচ',
      desc: 'ক্লাস সময়কাল: পরীক্ষা পর্যন্ত | প্রতিটি ক্লাস ২ ঘন্টা ব্যাপী | ক্লাস: ৫০টি | ক্লাস টেস্ট: ৫০টি | মডেল টেস্ট: ১০টি',
      price: '৳ 10000.00',
      id: 4
    },
    {
      title: 'বার ”লিখিত” পরীক্ষা প্রস্তুতি অনলাইন ব্যাচ',
      desc: 'ক্লাস সময়কাল: পরীক্ষা পর্যন্ত | প্রতিটি ক্লাস ২ ঘন্টা ব্যাপী | ক্লাস: ৫০টি | ক্লাস টেস্ট: ৫০টি | মডেল টেস্ট: ১০টি',
      price: '৳ 7000.00',
      id: 5
    },
    {
      title: 'বার প্রিলি শর্ট কোর্স',
      desc: 'মোট ক্লাস: ১২ টি | ক্লাস রাত: ৮ টা টু ১২ টা | মডেল টেস্ট: ০৩ টি',
      price: '৳ 3000.00',
      oldPrice: '৳ 15000.00',
      id: 6
    },
  ];

  const books = [
    { title: 'বার প্রিলিমিনারী (MCQ) মডেল টেষ্ট', id: 'book1', price: '৳ 300.00' },
    { title: 'বার প্রিলি হ্যান্ড নোট', id: 'book2', price: '৳ 1000.00' },
    { title: 'বিজেএস প্রিলিমিনারী মডেল টেষ্ট', id: 'book3', price: '৳ 300.00' },
    { title: 'বার লিখিত হ্যান্ড নোট', id: 'book4', price: '৳ 1200.00' },
  ];

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <GlobalHeader />

      {/* Dynamic Hero Slider */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden">
        {heroSlides.map((slide: any, index: number) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ backgroundColor: slide.color }}
          >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            <div
              className="absolute inset-0 z-[-1] bg-cover bg-center animate-scale"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center w-full relative z-10">
              <div className="space-y-6">
                <div className="animate-in slide-in-from-left duration-700">
                  <h3 className="text-[#f39c12] text-xl font-black uppercase tracking-[0.3em] mb-2">{slide.subtitle}</h3>
                  <h2 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter">
                    {slide.title.split(' ').map((word: string, i: number) => (
                      <span key={i} className={i === 0 ? 'block' : 'text-[#f39c12]'}>{word} </span>
                    ))}
                  </h2>
                  <p className="text-white/80 text-lg md:text-xl font-bold italic mt-4 max-w-lg">
                    {slide.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-left delay-300 duration-700">
                  {slide.items.map((item: string, i: number) => (
                    <div key={i} className="text-white text-lg font-bold flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#f39c12] rounded-full"></div>
                      {item.replace('- ', '')}
                    </div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4 animate-in slide-in-from-left delay-500 duration-700">
                  <Link href="/login" className="bg-[#f39c12] text-white px-10 py-4 rounded-md font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all shadow-xl">
                    Admission Now
                  </Link>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-md font-black uppercase tracking-widest text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                    <Play size={16} fill="currentColor" /> Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Navigation */}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all">
          <ChevronRight size={32} />
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 transition-all duration-500 rounded-full ${i === currentSlide ? 'w-12 bg-[#f39c12]' : 'w-2 bg-white/30'}`}
            ></button>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1a4d2e]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#a81c22]/10 rounded-full blur-3xl"></div>
            <div className="relative bg-white p-2 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden group">
              <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <span className="text-gray-300 font-black text-2xl italic tracking-widest uppercase opacity-40">Academy Excellence</span>
              </div>
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-white shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                <p className="text-[#a81c22] font-black italic text-xl">৯ বছর ধরে সফলতার শীর্ষে</p>
                <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-1">Namelyze Law Academy</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#a81c22]/5 text-[#a81c22] rounded-full text-xs font-black uppercase tracking-widest border border-[#a81c22]/10 italic">
              <div className="w-1.5 h-1.5 bg-[#a81c22] rounded-full animate-pulse"></div>
              আইন শিক্ষায় নতুন দিগন্ত
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight italic tracking-tighter">
              স্বপ্ন যেখানে রূপ নেয় <span className="text-[#a81c22]">বাস্তবে</span>, আমরা সেখানে পাশে থাকি।
            </h2>
            <p className="text-xl text-gray-500 font-bold italic leading-relaxed">
              Namelyze Law Academy একটি ব্যতিক্রমধর্মী আইন শিক্ষা প্রতিষ্ঠান। আমাদের সাথে আপনার লক্ষ্য হোক পূর্ণাঙ্গ প্রস্তুতি। বিজেএস এবং বার কাউন্সিল পরীক্ষায় আমরাই সেরা।
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="text-4xl font-black text-[#1a4d2e]">৫০০০+</h4>
                <p className="text-sm font-bold text-gray-400 mt-1">সফল শিক্ষার্থী</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-[#e67e22]">৯৪%</h4>
                <p className="text-sm font-bold text-gray-400 mt-1">সাফল্যের হার</p>
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <Link href="#" className="flex-1 flex items-center justify-center gap-3 bg-[#1877F2] text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-lg active:scale-95">
                <Facebook size={20} fill="white" /> Member Site
              </Link>
              <Link href="#" className="flex-1 flex items-center justify-center gap-3 bg-[#FF0000] text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition-all shadow-lg active:scale-95">
                <Youtube size={20} fill="white" /> Tutorial Class
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a4d2e]/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center mb-20 space-y-4">
            <span className="text-[#a81c22] font-black uppercase tracking-[0.4em] text-xs">OUR ACADEMIC PROGRAMS</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 italic uppercase">আমাদের <span className="text-[#a81c22]">প্রোগ্রামসমূহ</span></h2>
            <div className="w-20 h-2 bg-[#a81c22] rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((p) => (
              <Card key={p.id} className="border-none shadow-xl hover:shadow-2xl transition-all rounded-3xl overflow-hidden flex flex-col h-full group bg-white border border-gray-100">
                <div className="h-48 bg-gray-200 w-full relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <span className="text-gray-400 font-black italic opacity-20 text-4xl select-none group-hover:scale-110 transition-transform duration-700 uppercase">Law Course</span>
                  <div className="absolute top-5 right-5 bg-[#e67e22] text-white px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                    Admission On
                  </div>
                </div>
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-[#a81c22] transition-colors leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-bold italic leading-relaxed border-l-4 border-gray-100 pl-4">
                    {p.desc}
                  </p>
                  <div className="pt-6 mt-auto flex items-center justify-between border-t border-gray-50">
                    <div className="flex flex-col">
                      {p.oldPrice && <span className="text-xs text-gray-300 line-through font-bold mb-1">{p.oldPrice}</span>}
                      <span className="text-2xl font-black text-[#a81c22] italic">{p.price}</span>
                    </div>
                    <button className="bg-gray-900 group-hover:bg-[#a81c22] text-white p-4 rounded-2xl transition-all shadow-lg active:scale-95">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Book Store Section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div className="space-y-4">
            <span className="text-[#1a4d2e] font-black uppercase tracking-[0.4em] text-xs leading-none">THE LAW LIBRARY</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 italic uppercase leading-none">আমাদের বই ও <span className="text-[#a81c22]">নোটসমূহ</span></h2>
          </div>
          <Link href="#" className="text-sm font-black text-[#a81c22] border-b-2 border-[#a81c22] pb-1 hover:text-black hover:border-black transition-all hidden md:block uppercase tracking-widest">
            Browse Full Archive →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {books.map((b) => (
            <div key={b.id} className="group flex flex-col items-center">
              <div className="w-full aspect-[4/5] bg-white border border-gray-100 shadow-xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 rounded-lg overflow-hidden p-6 mb-6 flex items-center justify-center relative translate-y-0 group-hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#a81c22]/5 to-transparent"></div>
                <div className="w-full h-full bg-gray-50 border border-gray-100 shadow-inner flex flex-col items-center justify-center p-4">
                  <div className="w-full h-1 bg-[#a81c22] mb-12"></div>
                  <span className="text-gray-300 font-black italic opacity-30 text-center uppercase tracking-tighter">Namelyze <br /> Publication</span>
                </div>
              </div>
              <h4 className="font-black text-gray-800 text-center mb-2 px-2 h-10 overflow-hidden line-clamp-2 italic">{b.title}</h4>
              <p className="text-xl font-black text-[#a81c22] mb-4">{b.price}</p>
              <button className="bg-gray-100 text-gray-500 group-hover:bg-[#f39c12] group-hover:text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all shadow-sm group-hover:shadow-lg active:scale-95">
                Add To Bag
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Success Slider */}
      <section className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a81c22]/10 rounded-full blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-[#a81c22] font-black uppercase tracking-[0.4em] text-xs">SUCCESS HALL OF FAME</span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase whitespace-nowrap">আমাদের সফলতার গল্প</h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSuccessOffset(prev => Math.max(0, prev - 1))}
                className="w-14 h-14 border border-white/10 hover:border-[#a81c22] hover:text-[#a81c22] transition-all flex items-center justify-center rounded-full group"
              >
                <ChevronLeft className="group-active:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setSuccessOffset(prev => Math.min(successes.length - 3, prev + 1))}
                className="w-14 h-14 border border-white/10 hover:border-[#a81c22] hover:text-[#a81c22] transition-all flex items-center justify-center rounded-full group"
              >
                <ChevronRight className="group-active:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${successOffset * (100 / (window?.innerWidth > 768 ? 3 : 1))}%)` }}
            >
              {successes.map((s, i) => (
                <div key={i} className="min-w-full md:min-w-[calc(33.333%-1.5rem)] bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all group shrink-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-[#a81c22] to-[#e67e22] rounded-2xl flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-black italic">{s.name}</h4>
                      <p className="text-[#a81c22] text-xs font-black uppercase tracking-widest">{s.achievement}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 italic font-bold leading-relaxed mb-8">
                    "{s.quote}"
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <div className="w-8 h-px bg-white/20"></div>
                    Namelyze Law Academy
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-6 px-10 py-5 bg-white text-black rounded-2xl font-black italic uppercase tracking-widest cursor-pointer hover:bg-[#a81c22] hover:text-white transition-all shadow-xl shadow-black/20 group">
              আরও সফলতার গল্প দেখুন <div className="w-10 h-10 bg-black/5 group-hover:bg-white/20 rounded-full flex items-center justify-center"><ChevronRight size={20} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Section - Restored */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="text-[#a81c22] font-black uppercase tracking-[0.4em] text-xs">VISUAL JOURNEY</span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 italic uppercase">ফটো <span className="text-[#a81c22]">গ্যালারি</span></h2>
            <div className="w-20 h-2 bg-[#a81c22] rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="group relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-[#34495e] opacity-10 group-hover:opacity-0 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-300 font-black italic opacity-20 text-xs md:text-sm uppercase tracking-tighter">Namelyze <br /> Moment {item}</span>
                </div>
                {/* Decorative overlay on hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#a81c22]/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-[10px] font-black uppercase tracking-widest italic">Academic Event 2026</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="#" className="inline-flex items-center gap-2 text-sm font-black text-[#a81c22] group hover:text-black transition-colors uppercase tracking-[0.2em] italic">
              View All Pictures <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Standard, Focused CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-[#a81c22] rounded-[3rem] p-12 md:p-20 overflow-hidden shadow-2xl flex flex-col items-center text-center">
            {/* Minimal pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.1)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_75%,transparent_75%,transparent)] bg-[length:4px_4px] opacity-20"></div>

            <div className="relative z-10 space-y-8 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-white italic leading-tight">
                আপনার আইনি ক্যারিয়ারের <br /> শুরু হোক এখানেই।
              </h2>
              <p className="text-white/80 text-lg font-bold italic">
                আজই ভর্তি হোন এবং নিজেকে গড়ে তুলুন একজন আত্মবিশ্বাসী ও সফল আইন বিশেষজ্ঞ হিসেবে।
              </p>

              <div className="pt-6 flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/login" className="px-12 py-5 bg-[#f39c12] text-white rounded-2xl font-black italic uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl active:scale-95">
                  Admit Me Now
                </Link>
                <Link href="#" className="px-12 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-2xl font-black italic uppercase tracking-widest text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={18} /> Chat with Mentor
                </Link>
              </div>
            </div>

            {/* Subtle floating icon */}
            <div className="absolute bottom-[-20px] right-[-20px] opacity-10 rotate-12 hidden lg:block">
              <Scale size={180} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
