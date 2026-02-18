'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Users,
    BookOpen,
    Plus,
    FileText,
    BarChart2,
    MoreVertical,
    Calendar,
    Clock,
    ArrowRight
} from 'lucide-react';

export default function TeacherDashboard() {
    const [activeCourses, setActiveCourses] = useState([
        { id: '1', title: 'Advanced Mathematics', students: 45, exams: 3, attendance: '92%' },
        { id: '2', title: 'Physics for Engineers', students: 38, exams: 2, attendance: '88%' },
    ]);

    const [pendingGrading, setPendingGrading] = useState([
        { id: '1', title: 'Calculus Final - Written', student: 'John Doe', submitted: '2 hours ago', course: 'Math' },
        { id: '2', title: 'Quantum Mechanics Essay', student: 'Jane Smith', submitted: '5 hours ago', course: 'Physics' },
    ]);

    return (
        <DashboardLayout allowedRoles={['TEACHER']}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Teacher Overview</h1>
                    <p className="text-gray-500 mt-1">Manage your courses, exams, and grade student submissions.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white flex items-center gap-2" href="/teacher/courses">
                        <Plus size={18} /> New Course
                    </Button>
                    <Button className="flex items-center gap-2" href="/teacher/exams/create">
                        <Plus size={18} /> Create Exam
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Students', value: '184', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Courses', value: '6', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Pending Grading', value: '12', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Avg. Pass Rate', value: '78%', icon: BarChart2, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Active Courses */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">My Active Courses</h2>
                        <Button variant="ghost" size="sm" className="text-primary-600" href="/teacher/courses">View All</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeCourses.map((course) => (
                            <Card key={course.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
                                <div className="h-2 bg-primary-500 w-full"></div>
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-tight">
                                            {course.title}
                                        </h3>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-1.5"><Users size={14} /> Students</span>
                                            <span className="font-semibold">{course.students}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-1.5"><FileText size={14} /> Active Exams</span>
                                            <span className="font-semibold">{course.exams}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500 flex items-center gap-1.5"><BarChart2 size={14} /> Success Rate</span>
                                            <span className="font-semibold text-green-600">{course.attendance}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" fullWidth className="mt-4 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all" href={`/teacher/courses/${course.id}`}>
                                        Course Settings
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Quick Exam Overview */}
                    <section className="mt-8">
                        <h2 className="text-xl font-bold mb-4">Upcoming Schedule</h2>
                        <Card padding={false} className="border-none shadow-sm overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {[
                                    { title: 'Math Quiz 1', time: 'Tomorrow, 10:00 AM', enrolled: '42/45', type: 'MCQ' },
                                    { title: 'Physics Midterm', time: 'Oct 28, 02:00 PM', enrolled: '38/38', type: 'Mixed' },
                                ].map((item, i) => (
                                    <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                                <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {item.time}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Students</p>
                                                <p className="text-sm font-bold">{item.enrolled}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-primary-600" href="/teacher/exams"><ArrowRight size={18} /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar - Submissions to Grade */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FileText className="text-orange-500" size={24} />
                        Pending Grading
                    </h2>
                    <div className="space-y-4">
                        {pendingGrading.map((sub) => (
                            <Card key={sub.id} className="border-none shadow-sm hover:ring-2 hover:ring-orange-500/20 transition-all">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded uppercase tracking-wider">
                                            {sub.course}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium uppercase">{sub.submitted}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-1">{sub.student}</h4>
                                    <p className="text-sm text-gray-500 mb-4">{sub.title}</p>
                                    <Button variant="secondary" size="sm" fullWidth className="bg-gray-100 text-gray-900 hover:bg-orange-500 hover:text-white border-none" href={`/teacher/submissions/${sub.id}`}>
                                        Grade Submission
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                        <Button variant="ghost" fullWidth className="text-gray-500 text-sm" href="/teacher/submissions">
                            View All Submissions
                        </Button>
                    </div>

                    <Card className="bg-gradient-to-br from-indigo-600 to-primary-700 text-white border-none shadow-xl">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-lg mb-2">Class Performance</h3>
                            <p className="text-indigo-100 text-sm mb-4">Overall student performance is up 12% compared to last semester.</p>
                            <div className="w-full bg-white/20 h-2 rounded-full mb-2 overflow-hidden">
                                <div className="h-full bg-white w-3/4 rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-indigo-50">
                                <span>75% AVG SCORE</span>
                                <span>TARGET: 80%</span>
                            </div>
                            <Button className="w-full mt-6 bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold" href="/teacher/analytics">
                                Detailed Analytics
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
