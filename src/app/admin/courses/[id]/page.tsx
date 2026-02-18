'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ChevronLeft,
    Settings2,
    Users,
    BookOpen,
    ShieldCheck,
    AlertTriangle,
    Trash2,
    Save,
    ExternalLink
} from 'lucide-react';

export default function AdminCourseManagePage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // Mock data for admin
    const course = {
        id: id,
        title: 'Advanced Calculus',
        code: 'MATH-401',
        instructor: 'Dr. Robert Fox',
        status: 'PUBLISHED',
        students: 45,
        created: 'Oct 01, 2023',
        lastAudit: 'Oct 15, 2023'
    };

    const handleBack = () => router.back();

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-600 font-bold uppercase tracking-widest text-[10px] mb-8 transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Courses List
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-black rounded uppercase tracking-widest border border-red-100 italic">Admin Audit</span>
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-black rounded uppercase tracking-widest border border-green-100 italic">Visible</span>
                        </div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">{course.title}</h1>
                        <p className="text-gray-400 font-bold uppercase tracking-widest mt-2">{course.code} • System ID: #CMS-{id}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl bg-white font-bold italic uppercase text-xs tracking-widest border-gray-200">
                            <Trash2 size={18} className="mr-2 text-red-500" /> Remove Course
                        </Button>
                        <Button className="h-12 px-8 rounded-2xl shadow-xl shadow-primary-200 font-black italic uppercase tracking-tighter">
                            <Save size={18} className="mr-2" /> Commit Changes
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Instructor', value: course.instructor, icon: Users },
                        { label: 'Total Enrollment', value: course.students, icon: Users },
                        { label: 'Creation Date', value: course.created, icon: BookOpen },
                        { label: 'Last System Audit', value: course.lastAudit, icon: ShieldCheck },
                    ].map((item, i) => (
                        <div key={i} className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 mb-4">
                                <item.icon size={20} />
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                            <p className="font-black text-gray-900 truncate">{item.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                        <div className="h-2 bg-gray-900"></div>
                        <CardContent className="p-10">
                            <h3 className="text-xl font-black italic uppercase text-gray-900 mb-8 flex items-center gap-3">
                                <Settings2 size={24} className="text-primary-600" /> Governance Settings
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: 'System Visibility', value: 'Global', desc: 'Who can find this course in catalog' },
                                    { label: 'Audit Trail', value: 'Enabled', desc: 'Track all changes to materials' },
                                    { label: 'Proctoring Requirement', value: 'Strict', desc: 'Identity verification for exams' },
                                ].map((s, i) => (
                                    <div key={i} className="flex items-start justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-primary-100 transition-colors cursor-pointer group">
                                        <div>
                                            <p className="font-bold text-gray-900 uppercase italic tracking-tight text-sm">{s.label}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{s.desc}</p>
                                        </div>
                                        <span className="text-primary-600 font-black italic uppercase text-xs tracking-widest">{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl rounded-[2.5rem] bg-gray-900 text-white overflow-hidden p-2">
                        <CardContent className="p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black italic uppercase text-white flex items-center gap-3">
                                    <AlertTriangle size={24} className="text-red-500" /> Danger Zone
                                </h3>
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            </div>

                            <p className="text-gray-400 text-sm mb-10 italic leading-relaxed">
                                Critical infrastructure actions for this course. Be advised: actions here may disrupt learning for {course.students} active students.
                            </p>

                            <div className="space-y-4">
                                <Button fullWidth variant="outline" className="border-white/10 text-white hover:bg-white/5 h-14 rounded-2xl font-black italic uppercase tracking-widest text-xs">
                                    SUSPEND ALL ACTIVITY
                                </Button>
                                <Button fullWidth variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10 h-14 rounded-2xl font-black italic uppercase tracking-widest text-xs">
                                    PERMANENT PURGE
                                </Button>
                                <Button fullWidth variant="ghost" className="text-gray-500 hover:text-white mt-4 font-bold uppercase tracking-widest text-[10px]">
                                    <ExternalLink size={14} className="mr-2" /> EXPORT SYSTEM LOGS FOR AUDIT
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
