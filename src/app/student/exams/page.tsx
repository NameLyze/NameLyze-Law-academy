'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ClipboardList,
    Search,
    Filter,
    Clock,
    Calendar,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StudentExamsPage() {
    const router = useRouter();

    const exams = [
        {
            id: '1',
            title: 'Advanced Calculus Midterm',
            course: 'Advanced Calculus',
            status: 'ACTIVE',
            date: 'Oct 24, 2023',
            time: '10:00 AM',
            duration: '120 min',
            marks: 100,
            type: 'MCQ + Written'
        },
        {
            id: '2',
            title: 'Organic Chemistry Quiz',
            course: 'Organic Chemistry',
            status: 'SCHEDULED',
            date: 'Oct 28, 2023',
            time: '02:00 PM',
            duration: '45 min',
            marks: 30,
            type: 'MCQ'
        },
        {
            id: '3',
            title: 'Quantum Mechanics Final',
            course: 'Quantum Physics',
            status: 'COMPLETED',
            date: 'Oct 15, 2023',
            time: '09:00 AM',
            duration: '180 min',
            marks: 150,
            score: '132/150',
            type: 'Written'
        }
    ];

    return (
        <DashboardLayout allowedRoles={['STUDENT']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Exams</h1>
                    <p className="text-gray-500 mt-1">View your upcoming, active, and completed examinations.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white">
                        <Filter size={18} className="mr-2" /> All Exams
                    </Button>
                    <Button className="shadow-lg shadow-primary-200">
                        Join Exam with Code
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                {/* Active Exams Section */}
                <section>
                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Active Now
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                        {exams.filter(e => e.status === 'ACTIVE').map(exam => (
                            <Card key={exam.id} className="border-2 border-primary-100 bg-primary-50/30 overflow-hidden rounded-3xl group">
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <div className="p-8 md:p-10 flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-primary-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary-200">
                                                Live Now
                                            </span>
                                            <span className="text-xs text-primary-600 font-bold">{exam.course}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-700 transition-colors uppercase italic">{exam.title}</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                                                <p className="text-sm font-black text-gray-900 flex items-center gap-2"><Clock size={16} className="text-primary-600" /> {exam.duration}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Marks</p>
                                                <p className="text-sm font-black text-gray-900 flex items-center gap-2"><ClipboardList size={16} className="text-primary-600" /> {exam.marks} Pts</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ends At</p>
                                                <p className="text-sm font-black text-gray-900 flex items-center gap-2"><Calendar size={16} className="text-primary-600" /> 12:00 PM</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Questions</p>
                                                <p className="text-sm font-black text-gray-900">45 MCQ + 2 ESSAY</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-10 md:bg-white/50 md:border-l border-primary-100 flex items-center justify-center">
                                        <Button
                                            onClick={() => router.push(`/student/exams/${exam.id}`)}
                                            className="h-16 px-10 rounded-2xl text-lg font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 group-hover:scale-105 transition-transform"
                                        >
                                            ENTER EXAM HALL <ArrowRight size={20} className="ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Scheduled & Completed */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section>
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Upcoming Schedule</h2>
                        <div className="space-y-4">
                            {exams.filter(e => e.status === 'SCHEDULED').map(exam => (
                                <Card key={exam.id} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">{exam.course}</span>
                                            <h4 className="font-bold text-gray-900 mt-1">{exam.title}</h4>
                                            <div className="flex items-center gap-3 mt-3 text-xs text-gray-500 font-medium">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {exam.date}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {exam.time}</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Past Results</h2>
                        <div className="space-y-4">
                            {exams.filter(e => e.status === 'COMPLETED').map(exam => (
                                <Card key={exam.id}
                                    onClick={() => router.push(`/student/exams/${exam.id}/result`)}
                                    className="p-6 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group bg-gray-50/50"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{exam.course}</span>
                                            <h4 className="font-bold text-gray-900 mt-1">{exam.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><CheckCircle2 size={12} className="text-green-500" /> Completed on {exam.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-primary-700">{exam.score}</p>
                                            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Passed</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
