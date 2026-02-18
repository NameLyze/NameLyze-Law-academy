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
    MoreVertical,
    Users,
    Settings2,
    Lock,
    Unlock
} from 'lucide-react';

export default function TeacherCoursesPage() {
    const courses = [
        { id: '1', title: 'Calculus Final Preparation', code: 'MATH-401', students: 45, exams: 3, status: 'PUBLISHED' },
        { id: '2', title: 'Algebra Mastery', code: 'MATH-102', students: 88, exams: 5, status: 'PUBLISHED' },
        { id: '3', title: 'Geometry Basics', code: 'MATH-101', students: 30, exams: 2, status: 'DRAFT' },
    ];

    return (
        <DashboardLayout allowedRoles={['TEACHER', 'ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 uppercase italic">My Courses</h1>
                    <p className="text-gray-500 mt-1">Manage your created courses, modules, and enrolled students.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="shadow-xl shadow-primary-200 h-11 px-6 rounded-2xl bg-primary-600 font-black">
                        <Plus size={18} className="mr-2" /> CREATE NEW COURSE
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <Card key={course.id} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group">
                        <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
                            <div className="flex justify-between items-start relative z-10">
                                <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-black text-white/70 uppercase tracking-widest border border-white/10 backdrop-blur-md">
                                    {course.code}
                                </span>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/20">
                                    <MoreVertical size={16} />
                                </Button>
                            </div>
                            <h3 className="text-xl font-black text-white leading-tight uppercase relative z-10 italic">{course.title}</h3>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Students</p>
                                    <p className="text-lg font-black text-gray-900 flex items-center gap-2 italic">
                                        <Users size={16} className="text-primary-600" /> {course.students}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Modules / Exams</p>
                                    <p className="text-lg font-black text-gray-900 flex items-center gap-2 italic">
                                        <BookOpen size={16} className="text-primary-600" /> {course.exams}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto">
                                <Button className="flex-1 h-12 rounded-2xl font-black bg-white text-gray-900 border-2 border-gray-100 hover:border-primary-600 hover:text-primary-600 transition-all uppercase italic text-xs tracking-widest">
                                    Edit Content
                                </Button>
                                <Button className="w-12 h-12 p-0 rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-100 flex items-center justify-center">
                                    <Settings2 size={18} />
                                </Button>
                            </div>

                            <div className="mt-6 flex items-center justify-center">
                                {course.status === 'PUBLISHED' ? (
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-green-500 uppercase tracking-widest italic">
                                        <Unlock size={12} /> Live & Published
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 uppercase tracking-widest italic">
                                        <Lock size={12} /> Saved in Drafts
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <button className="h-full min-h-[400px] border-4 border-dashed border-gray-100 rounded-[2rem] p-10 flex flex-col items-center justify-center text-gray-300 hover:border-primary-200 hover:text-primary-400 transition-all group bg-gray-50/30">
                    <div className="w-20 h-20 rounded-3xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:shadow-md transition-all group-hover:scale-110">
                        <Plus size={32} />
                    </div>
                    <h3 className="font-black text-xl italic uppercase tracking-tight">Create Course</h3>
                    <p className="text-xs font-bold mt-2 uppercase tracking-widest opacity-60">Ready for a new class?</p>
                </button>
            </div>
        </DashboardLayout>
    );
}
