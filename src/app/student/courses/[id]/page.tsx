'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    BookOpen,
    PlayCircle,
    FileText,
    CheckCircle2,
    Clock,
    ChevronRight,
    Download,
    Star,
    MessageSquare,
    Users
} from 'lucide-react';

export default function CourseDetailsPage() {
    const params = useParams();
    const id = params.id;
    const [activeMaterial, setActiveMaterial] = useState<any>(null);

    // Mock data for the specific course
    const course = {
        id: id,
        title: 'Advanced Calculus',
        code: 'MATH-401',
        teacher: 'Dr. Robert Fox',
        progress: 65,
        chapters: 12,
        materials: 48,
        description: 'This course covers advanced topics in calculus including multivariable calculus, vector analysis, and differential equations. Designed for science and engineering students.',
        color: 'bg-blue-600',
        content: [
            { title: 'Introduction to Multivariable Functions', duration: '45 mins', completed: true, type: 'video', url: 'https://example.com/video1' },
            { title: 'Partial Derivatives & Chain Rule', duration: '1.2 hours', completed: true, type: 'video', url: 'https://example.com/video2' },
            { title: 'Multiple Integrals in Polar Coordinates', duration: '55 mins', completed: false, type: 'video', url: 'https://example.com/video3' },
            { title: 'Vector Fields & Line Integrals', duration: '2 hours', completed: false, type: 'document', url: 'https://example.com/doc1' },
            { title: 'Stokes Theorem & Green Theorem', duration: '1.5 hours', completed: false, type: 'document', url: 'https://example.com/doc2' },
        ],
        stats: [
            { label: 'Students', value: '1.2k', icon: Users },
            { label: 'Avg Score', value: '84%', icon: Star },
            { label: 'Feedback', value: '4.8', icon: MessageSquare },
        ]
    };

    return (
        <DashboardLayout allowedRoles={['STUDENT']}>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Active Material Viewer Overlay */}
                {activeMaterial && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl rounded-[2.5rem] border-none">
                            <div className="p-6 bg-gray-900 text-white flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-primary-600 rounded-xl">
                                        {activeMaterial.type === 'video' ? <PlayCircle size={20} /> : <FileText size={20} />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{activeMaterial.type} View</p>
                                        <h3 className="font-bold">{activeMaterial.title}</h3>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveMaterial(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="flex-1 bg-gray-100 p-8 flex flex-col items-center justify-center min-h-[400px]">
                                {activeMaterial.type === 'video' ? (
                                    <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center relative overflow-hidden group border-8 border-white shadow-xl">
                                        <div className="w-20 h-20 rounded-full bg-primary-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <PlayCircle size={64} className="text-primary-600" />
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent flex items-center gap-4">
                                            <div className="h-1 bg-primary-600 rounded-full flex-1"></div>
                                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">00:00 / {activeMaterial.duration}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full h-full p-12 bg-white rounded-2xl text-center space-y-6 shadow-xl border border-gray-100">
                                        <FileText size={64} className="text-primary-100 mx-auto" />
                                        <h4 className="text-xl font-black italic uppercase tracking-tight text-gray-900">{activeMaterial.title}</h4>
                                        <p className="text-gray-500 max-w-md mx-auto">This document preview is limited in the mock version. Please download the full package to view all equations and charts.</p>
                                        <Button className="h-12 px-8 rounded-2xl">
                                            <Download size={18} className="mr-2" /> Download Full PDF
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                )}

                {/* Hero section */}
                <div className={`rounded-[2.5rem] ${course.color} p-8 md:p-12 text-white relative overflow-hidden shadow-2xl`}>
                    <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[150%] bg-white/10 rotate-12 blur-3xl rounded-full"></div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className="flex-1">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md uppercase tracking-widest border border-white/30">
                                {course.code}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight italic uppercase tracking-tighter">
                                {course.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-sm">
                                        RF
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Instructor</p>
                                        <p className="text-sm font-bold">{course.teacher}</p>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-white/20 hidden md:block"></div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Duration</p>
                                        <p className="text-sm font-bold">24 Total Hours</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl">
                            <p className="text-sm font-bold mb-4 uppercase tracking-widest">Course Progress</p>
                            <div className="flex items-center gap-4 mb-2">
                                <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white rounded-full" style={{ width: `${course.progress}%` }}></div>
                                </div>
                                <span className="text-xl font-black">{course.progress}%</span>
                            </div>
                            <Button fullWidth className="mt-4 bg-white text-blue-600 hover:bg-gray-100 border-none font-black italic uppercase tracking-widest py-6 rounded-2xl">
                                CONTINUE LEARNING
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Course Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black italic uppercase tracking-tight text-gray-900">Curriculum</h2>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{course.chapters} Chapters • {course.materials} Materials</span>
                        </div>

                        <div className="space-y-4">
                            {course.content.map((item, i) => (
                                <Card
                                    key={i}
                                    className="border-none shadow-sm hover:translate-x-2 hover:shadow-md transition-all group overflow-hidden cursor-pointer bg-white"
                                    onClick={() => setActiveMaterial(item)}
                                >
                                    <div className="flex items-center p-5">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 transition-colors ${item.completed ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600'
                                            }`}>
                                            {item.completed ? <CheckCircle2 size={24} /> : (item.type === 'video' ? <PlayCircle size={24} /> : <FileText size={24} />)}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-bold text-sm md:text-base ${item.completed ? 'text-gray-500' : 'text-gray-900'}`}>{item.title}</h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{item.duration} • {item.type}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
                                            >
                                                View {item.type}
                                            </Button>
                                            <ChevronRight size={20} className="text-gray-200 group-hover:text-primary-600 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8 text-gray-900">
                        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-black italic uppercase text-gray-900 mb-6">About Course</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                    {course.description}
                                </p>
                                <div className="grid grid-cols-1 gap-4">
                                    {course.stats.map((stat, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-600 shadow-sm border border-primary-50">
                                                <stat.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                                                <p className="text-lg font-black text-gray-900">{stat.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black italic uppercase mb-4">Resources</h3>
                                <p className="text-gray-400 text-sm mb-6">Download syllabus and offline materials for this course.</p>
                                <Button variant="outline" fullWidth className="border-white/20 text-white hover:bg-white/10 rounded-2xl font-black italic uppercase py-6">
                                    <Download size={18} className="mr-2" /> Download Package
                                </Button>
                            </div>
                            <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-primary-600/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
