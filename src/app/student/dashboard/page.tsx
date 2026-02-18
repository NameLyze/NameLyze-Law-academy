'use client';

import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    BookOpen,
    ArrowUpRight,
    ChevronRight,
    BarChart3
} from 'lucide-react';

export default function StudentDashboard() {
    const [stats, setStats] = useState({
        upcomingExams: 0,
        completedExams: 0,
        averageScore: 0,
        coursesEnrolled: 0,
    });

    const [upcomingExams, setUpcomingExams] = useState([
        { id: '1', title: 'Calculus Final Exam', subject: 'Mathematics', date: 'Oct 24, 2023', time: '10:00 AM', duration: '120 min', type: 'MCQ + Written' },
        { id: '2', title: 'English Grammar Quiz', subject: 'English', date: 'Oct 26, 2023', time: '02:30 PM', duration: '45 min', type: 'MCQ' },
    ]);

    const [recentExams, setRecentExams] = useState([
        { id: '3', title: 'Organic Chemistry Midterm', subject: 'Chemistry', date: 'Oct 15, 2023', score: '88/100', status: 'Graded', trend: '+5%' },
        { id: '4', title: 'Classical Physics Quiz', subject: 'Physics', date: 'Oct 12, 2023', score: ' Pending', status: 'Under Review', trend: null },
    ]);

    return (
        <DashboardLayout allowedRoles={['STUDENT']}>
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Student! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your studies today.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">View Schedule</Button>
                    <Button href="/student/courses">Browse Courses</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Upcoming Exams', value: '3', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'Next: Oct 24' },
                    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', trend: '+2 this month' },
                    { label: 'Avg. Score', value: '84%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', trend: 'Top 10%' },
                    { label: 'Courses', value: '5', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'Active' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{stat.label}</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                    {stat.trend}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Upcoming Exams */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ClipboardList className="text-primary-600" size={24} />
                                Upcoming Exams
                            </h2>
                            <Button variant="ghost" size="sm" className="text-primary-600" href="/student/exams">View All</Button>
                        </div>
                        <div className="space-y-4">
                            {upcomingExams.map((exam) => (
                                <Card key={exam.id} className="overflow-hidden border-none shadow-sm hover:ring-2 hover:ring-primary-500/20 transition-all group">
                                    <div className="flex flex-col md:flex-row md:items-center">
                                        <div className="p-1 md:h-24 w-full md:w-24 flex items-center justify-center bg-gray-50 border-r border-gray-100">
                                            <div className="text-center">
                                                <span className="block text-xs font-bold text-gray-400 uppercase">{exam.date.split(' ')[0]}</span>
                                                <span className="block text-xl font-bold text-gray-900">{exam.date.split(' ')[1].replace(',', '')}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 bg-primary-50 text-primary-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                                        {exam.subject}
                                                    </span>
                                                    <span className="text-xs text-gray-400">•</span>
                                                    <span className="text-xs text-gray-400">{exam.type}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                    {exam.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {exam.time}</span>
                                                    <span className="flex items-center gap-1"><AlertCircle size={14} /> {exam.duration}</span>
                                                </div>
                                            </div>
                                            <Button className="md:w-32 shadow-lg shadow-primary-200" href={`/student/exams/${exam.id}`}>Start Exam</Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Performance Summary Chart Placeholder */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="text-primary-600" size={24} />
                            Performance Analytics
                        </h2>
                        <Card className="border-none shadow-sm h-64 flex items-center justify-center bg-white/50 backdrop-blur-sm border border-white/20">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                    <BarChart3 size={32} />
                                </div>
                                <p className="text-gray-500 font-medium">Analytics chart will appear here after your next exam.</p>
                                <Button variant="link" className="mt-2" href="/student/analytics">Check details</Button>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar - Recent Activities & Learning Materials */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Exam History</h2>
                        <div className="space-y-3">
                            {recentExams.map((exam) => (
                                <div key={exam.id} className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{exam.title}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{exam.date} • {exam.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block font-bold text-sm ${exam.score.includes('/') ? 'text-primary-600' : 'text-orange-500'}`}>
                                            {exam.score}
                                        </span>
                                        {exam.trend && (
                                            <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 rounded leading-none">
                                                {exam.trend}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" fullWidth className="text-gray-500 text-sm mt-2 border-dashed border-2 border-gray-100 hover:border-primary-200" href="/student/analytics">
                                View Full Result History
                            </Button>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4">Quick Resources</h2>
                        <div className="bg-primary-700 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-primary-200">
                            <div className="relative z-10">
                                <p className="text-primary-100 text-xs font-bold uppercase tracking-widest mb-1">Recommended</p>
                                <h3 className="text-xl font-bold mb-3">Math Lecture: Advanced Calculus</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold backdrop-blur-sm">PDF Notes</span>
                                    <span className="bg-white/20 px-2 py-1 rounded text-[10px] font-bold backdrop-blur-sm">45 Min Video</span>
                                </div>
                                <Button variant="outline" fullWidth className="bg-white text-primary-700 border-none hover:bg-primary-50 font-bold transition-all transform hover:scale-[1.02]">
                                    Study Now
                                </Button>
                            </div>
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl text-primary-700"></div>
                            <div className="absolute bottom-[-10px] left-[-10px] w-24 h-24 bg-primary-600/30 rounded-full blur-2xl"></div>
                        </div>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}


