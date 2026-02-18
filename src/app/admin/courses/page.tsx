'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    BookOpen,
    Plus,
    Search,
    Filter,
    Settings2,
    Eye,
    Trash2,
    CheckCircle2,
    Clock,
    MoreVertical
} from 'lucide-react';

export default function AdminCoursesPage() {
    const courses = [
        {
            id: '1',
            title: 'Advanced Calculus',
            code: 'MATH-401',
            instructor: 'Dr. Robert Fox',
            students: 45,
            status: 'PUBLISHED',
            lastUpdate: 'Oct 20, 2023'
        },
        {
            id: '2',
            title: 'Introduction to Bio-metrics',
            code: 'BIO-101',
            instructor: 'Jane Cooper',
            students: 120,
            status: 'DRAFT',
            lastUpdate: 'Oct 18, 2023'
        },
        {
            id: '3',
            title: 'World History: Part II',
            code: 'HIST-202',
            instructor: 'Guy Hawkins',
            students: 85,
            status: 'PUBLISHED',
            lastUpdate: 'Oct 12, 2023'
        },
        {
            id: '4',
            title: 'Digital Marketing Fundamentals',
            code: 'MKT-301',
            instructor: 'Eleanor Pena',
            students: 210,
            status: 'PUBLISHED',
            lastUpdate: 'Sep 25, 2023'
        },
    ];

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
                    <p className="text-gray-500 mt-1">Review, approve, and manage all academic courses in the system.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white border-gray-200 h-11 px-6 rounded-2xl" onClick={() => alert('Downloading courses report...')}>
                        Download Report
                    </Button>
                    <Button className="shadow-lg shadow-primary-200 h-11 px-6 rounded-2xl" onClick={() => alert('Opening announcement editor...')}>
                        <Plus size={18} className="mr-2" /> Global Announcement
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden group">
                        <CardHeader className="p-6 border-b border-gray-50 bg-white">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${course.status === 'PUBLISHED' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {course.status}
                                </span>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg">
                                    <MoreVertical size={16} className="text-gray-400" />
                                </Button>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{course.code}</p>
                            <CardTitle className="text-lg font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                                {course.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 bg-gray-50/30">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-400 italic">
                                    {course.instructor.split(' ').map(n => n[0]).join('')}
                                </div>
                                <p className="text-xs font-bold text-gray-600 italic">By {course.instructor}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrolled</p>
                                    <p className="text-sm font-black text-gray-900">{course.students} Learners</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Updated</p>
                                    <p className="text-[10px] font-bold text-gray-500 italic">{course.lastUpdate}</p>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-2">
                                <Button className="flex-1 h-10 rounded-xl font-bold text-xs bg-primary-600 shadow-md shadow-primary-100" href={`/admin/courses/${course.id}`}>
                                    <Settings2 size={14} className="mr-2" /> Manage
                                </Button>
                                <Button variant="outline" className="h-10 px-3 rounded-xl bg-white" href={`/admin/courses/${course.id}/view`}>
                                    <Eye size={16} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
