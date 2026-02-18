'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    BookOpen,
    Search,
    Filter,
    Clock,
    PlayCircle,
    FileText,
    MoreVertical,
    ChevronRight
} from 'lucide-react';

export default function StudentCoursesPage() {
    const courses = [
        {
            id: '1',
            title: 'Advanced Calculus',
            code: 'MATH-401',
            teacher: 'Dr. Robert Fox',
            progress: 65,
            chapters: 12,
            materials: 48,
            lastAccessed: '2 hours ago',
            color: 'bg-blue-600'
        },
        {
            id: '2',
            title: 'Quantum Physics',
            code: 'PHYS-302',
            teacher: 'Prof. Albert Stein',
            progress: 32,
            chapters: 10,
            materials: 35,
            lastAccessed: 'Yesterday',
            color: 'bg-purple-600'
        },
        {
            id: '3',
            title: 'Organic Chemistry',
            code: 'CHEM-205',
            teacher: 'Dr. Jane Smith',
            progress: 88,
            chapters: 15,
            materials: 60,
            lastAccessed: '3 days ago',
            color: 'bg-green-600'
        }
    ];

    return (
        <DashboardLayout allowedRoles={['STUDENT']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                    <p className="text-gray-500 mt-1">Manage and access your enrolled learning materials.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
                        />
                    </div>
                    <Button variant="outline" className="bg-white">
                        <Filter size={18} className="mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} padding={false} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden rounded-3xl">
                        <div className={`h-32 ${course.color} relative overflow-hidden p-6 text-white`}>
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <span className="px-2 py-1 bg-white/20 rounded text-[10px] font-bold backdrop-blur-md uppercase tracking-widest leading-none">
                                    {course.code}
                                </span>
                                <h3 className="text-xl font-bold mt-2 leading-tight">{course.title}</h3>
                            </div>
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-sm">
                                    {course.teacher.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-none">Instructor</p>
                                    <p className="text-sm font-bold text-gray-900">{course.teacher}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Progress</span>
                                    <span className="text-gray-900 font-bold">{course.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${course.color} transition-all duration-1000`}
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6 py-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <PlayCircle size={16} />
                                    <span className="text-xs font-bold">{course.chapters} Chapters</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FileText size={16} />
                                    <span className="text-xs font-bold">{course.materials} Materials</span>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <Button className="flex-1 h-11 rounded-2xl font-bold shadow-lg shadow-primary-100" href={`/student/courses/${course.id}`}>
                                    Continue Learning
                                </Button>
                                <Button variant="outline" className="w-11 h-11 p-0 rounded-2xl" onClick={() => alert('Course options...')}>
                                    <MoreVertical size={18} />
                                </Button>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <Clock size={10} /> Last accessed {course.lastAccessed}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Course Card */}
                <button
                    className="border-4 border-dashed border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center text-gray-300 hover:border-primary-200 hover:text-primary-400 transition-all group"
                    onClick={() => alert('Opening course catalog...')}
                >
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                        <BookOpen size={32} />
                    </div>
                    <h3 className="font-bold text-lg">Enroll in New Course</h3>
                    <p className="text-xs mt-1">Explore our catalog of subjects</p>
                </button>
            </div>
        </DashboardLayout>
    );
}
