'use client';

import React, { useState } from 'react';
import { GlobalHeader } from '@/components/layout/GlobalHeader';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    CheckCircle2,
    ShieldCheck,
    Award,
    ChevronRight,
    ArrowRight,
    User as UserIcon,
    Phone as PhoneIcon,
    MapPin,
    Calendar as CalendarIcon,
    Heart,
    GraduationCap as GradIcon,
    Briefcase,
    Lock
} from 'lucide-react';

export default function AdmissionPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        fathersName: '',
        mothersName: '',
        gender: 'MALE',
        dateOfBirth: '',
        presentAddress: '',
        permanentAddress: '',
        bloodGroup: '',
        nationalId: '',
        occupation: '',
        institution: '',
        educationalQualification: '',
        emergencyContact: '',
        role: 'STUDENT'
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // For demo, we just login after registration
                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: formData.email, password: formData.password }),
                });

                if (loginRes.ok) {
                    const loginData = await loginRes.json();
                    localStorage.setItem('token', loginData.data.token);
                    localStorage.setItem('user', JSON.stringify(loginData.data.user));
                    router.push('/student/dashboard');
                } else {
                    router.push('/login');
                }
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-gray-800">
            <GlobalHeader />

            {/* Page Header */}
            <section className="bg-gray-50 py-20 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs font-black text-[#a81c22] uppercase tracking-[0.2em] italic">Join the Academy</span>
                            <div className="w-10 h-[1px] bg-gray-300"></div>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-6">Namelyze <br /><span className="text-[#a81c22]">ভর্তি ফরম</span></h1>
                        <p className="text-xl text-gray-400 font-bold italic max-w-md">আপনার উজ্জ্বল আইনি ভবিষ্যৎ নিশ্চিত করতে আজই ভর্তি সম্পন্ন করুন।</p>
                    </div>
                    <div className="hidden lg:flex flex-wrap gap-8 justify-end">
                        {[
                            { label: 'Verified Academy', icon: ShieldCheck },
                            { label: 'Expert Mentorship', icon: Award },
                            { label: 'Easy Success', icon: CheckCircle2 },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#a81c22]">
                                    <item.icon size={32} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-20">
                {/* Benefits */}
                <div className="lg:col-span-1 space-y-12">
                    <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tight">ভর্তি পরবর্তী <span className="text-[#a81c22]">সুযোগ-সুবিধা</span></h2>

                    <div className="space-y-8">
                        {[
                            { title: 'লাইভ ও রেকর্ডেড ক্লাস সুবিধা', desc: 'প্রতিটি ক্লাস এইচডি কোয়ালিটিতে আর্কাইভ করা থাকবে।' },
                            { title: 'নিয়মিত আপডেট লেকচার শিট', desc: 'আইন সংশোধন অনুযায়ী প্রতিনিয়ত আপডেট ম্যাটেরিয়াল প্রদান।' },
                            { title: 'সাপ্তাহিক ও মাসিক মডেল টেস্ট', desc: 'প্রতি শুক্রবার বিশেষ পরীক্ষা ও মেধা যাচাই।' },
                            { title: 'মেন্টর সাপোর্ট ২৪/৭', desc: 'যেকোনো আইনি জটিলতায় মেন্টরদের সরাসরি গাইডলাইন।' },
                        ].map((benefit, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="mt-1 w-8 h-8 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <ArrowRight size={16} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-lg font-black text-gray-800 italic uppercase">{benefit.title}</h4>
                                    <p className="text-xs font-bold text-gray-400 italic leading-relaxed">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Admission Form */}
                <div className="lg:col-span-2">
                    <Card className="border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] overflow-hidden bg-white">
                        <CardContent className="p-8 md:p-16 space-y-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900 italic uppercase">শিক্ষার্থী নিবন্ধন</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Personal & Academic Information</p>
                                </div>
                                <div className="flex items-center gap-2 bg-[#a81c22]/5 px-4 py-2 rounded-xl">
                                    <ShieldCheck className="text-[#a81c22]" size={18} />
                                    <span className="text-[10px] font-black text-[#a81c22] uppercase tracking-widest">Secure Enrollment</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Basic Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-[#a81c22]">
                                        <UserIcon size={18} />
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">সাধারণ তথ্য</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="আপনার নাম (পূর্ণাঙ্গ)"
                                            placeholder="Enter Your Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            fullWidth
                                            required
                                        />
                                        <Input
                                            label="পিতার নাম"
                                            placeholder="Father's Name"
                                            value={formData.fathersName}
                                            onChange={(e) => setFormData({ ...formData, fathersName: e.target.value })}
                                            fullWidth
                                        />
                                        <Input
                                            label="মাতার নাম"
                                            placeholder="Mother's Name"
                                            value={formData.mothersName}
                                            onChange={(e) => setFormData({ ...formData, mothersName: e.target.value })}
                                            fullWidth
                                        />
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest leading-none">লিঙ্গ (Gender)</label>
                                            <select
                                                className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#a81c22] font-bold text-sm"
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            >
                                                <option value="MALE">পুরুষ (Male)</option>
                                                <option value="FEMALE">মহিলা (Female)</option>
                                                <option value="OTHER">অন্যান্য (Other)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-[#a81c22]">
                                        <PhoneIcon size={18} />
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">যোগাযোগের তথ্য</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="মোবাইল নম্বর"
                                            placeholder="01XXX-XXXXXX"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            fullWidth
                                            required
                                        />
                                        <Input
                                            label="ইমেইল অ্যাড্রেস"
                                            type="email"
                                            placeholder="legal@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            fullWidth
                                            required
                                        />
                                        <Input
                                            label="জরুরি যোগাযোগ নম্বর"
                                            placeholder="Emergency Contact"
                                            value={formData.emergencyContact}
                                            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                            fullWidth
                                        />
                                        <Input
                                            label="জাতীয় পরিচয়পত্র (NID)"
                                            placeholder="NID Number"
                                            value={formData.nationalId}
                                            onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                                            fullWidth
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <Input
                                            label="বর্তমান ঠিকানা"
                                            placeholder="Present Address"
                                            value={formData.presentAddress}
                                            onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                                            fullWidth
                                        />
                                        <Input
                                            label="স্থায়ী ঠিকানা"
                                            placeholder="Permanent Address"
                                            value={formData.permanentAddress}
                                            onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                                            fullWidth
                                        />
                                    </div>
                                </div>

                                {/* Academic Info */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-[#a81c22]">
                                        <GradIcon size={18} />
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">শিক্ষাগত তথ্য</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="শিক্ষা প্রতিষ্ঠান"
                                            placeholder="University / College"
                                            value={formData.institution}
                                            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                            fullWidth
                                        />
                                        <Input
                                            label="শিক্ষাগত যোগ্যতা"
                                            placeholder="Latest Degree"
                                            value={formData.educationalQualification}
                                            onChange={(e) => setFormData({ ...formData, educationalQualification: e.target.value })}
                                            fullWidth
                                        />
                                        <Input
                                            label="পেশা"
                                            placeholder="Occupation"
                                            value={formData.occupation}
                                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                            fullWidth
                                        />
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-gray-400 uppercase tracking-widest leading-none">রক্তের গ্রুপ (Blood Group)</label>
                                            <select
                                                className="w-full h-14 px-5 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#a81c22] font-bold text-sm"
                                                value={formData.bloodGroup}
                                                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                            >
                                                <option value="">Select Blood Group</option>
                                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => (
                                                    <option key={b} value={b}>{b}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="space-y-6 pt-6 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-[#f39c12]">
                                        <Lock size={18} />
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">নিরাপত্তা</h4>
                                    </div>
                                    <Input
                                        label="পাসওয়ার্ড সেট করুন"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        fullWidth
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase italic rounded-xl">
                                        {error}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    disabled={isLoading}
                                    className="bg-[#a81c22] hover:bg-black text-white h-20 rounded-2xl font-black uppercase italic tracking-[0.2em] text-sm shadow-2xl shadow-[#a81c22]/30 transition-all active:scale-95 flex items-center justify-center gap-4"
                                >
                                    {isLoading ? 'Processing Admission...' : (
                                        <>ভর্তি সম্পন্ন করুন <ArrowRight size={20} /></>
                                    )}
                                </Button>
                            </form>

                            <div className="text-center pt-8 border-t border-gray-50">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] italic">Already have an account? <Link href="/login" className="text-[#a81c22] border-b border-[#a81c22]/20 hover:border-[#a81c22] transition-colors">Sign In Here</Link></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <div className="h-40"></div>
            <Footer />
        </div>
    );
}
