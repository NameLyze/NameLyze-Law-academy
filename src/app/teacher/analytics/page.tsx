'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    BarChart3,
    TrendingUp,
    Clock,
    Target,
    Download,
    Filter,
    Users,
    Award
} from 'lucide-react';

export default function TeacherAnalyticsPage() {
    return (
        <DashboardLayout allowedRoles={['TEACHER', 'ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight italic uppercase">Teaching Analytics</h1>
                    <p className="text-gray-500 mt-1">Monitor class performance, exam insights, and student engagement.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="shadow-xl shadow-primary-200 rounded-2xl h-11 px-6">
                        <Download size={18} className="mr-2" /> Export Gradebook
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="border-none shadow-sm rounded-3xl p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Class Average</p>
                    <h2 className="text-3xl font-black text-primary-700">74.2%</h2>
                    <p className="text-xs font-bold text-green-500 mt-1">+5% vs last sem</p>
                </Card>
                <Card className="border-none shadow-sm rounded-3xl p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Students</p>
                    <h2 className="text-3xl font-black text-gray-900">1,240</h2>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                        <Users size={12} /> Active Enrollment
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-3xl p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pass Rate</p>
                    <h2 className="text-3xl font-black text-green-600">91%</h2>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                        <Award size={12} /> Excellence Level
                    </div>
                </Card>
                <Card className="border-none shadow-sm rounded-3xl p-6">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Exams Held</p>
                    <h2 className="text-3xl font-black text-gray-900">24</h2>
                    <p className="text-xs font-bold text-primary-500 mt-1">8 Upcoming</p>
                </Card>
            </div>

            <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden mb-8">
                <CardHeader className="bg-white p-8 border-b border-gray-50 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-black text-gray-900 italic uppercase">Performance Trend</CardTitle>
                    <div className="flex gap-2">
                        <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                            <span className="w-3 h-3 bg-primary-500 rounded-full"></span> This Year
                        </span>
                        <span className="flex items-center gap-2 text-xs font-bold text-gray-200">
                            <span className="w-3 h-3 bg-gray-200 rounded-full"></span> Last Year
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="h-80 p-8 flex items-end justify-between gap-4">
                    {[40, 60, 55, 80, 70, 90, 85, 95, 75, 85, 90, 100].map((h, i) => (
                        <div key={i} className="flex-1 space-y-2">
                            <div className="relative group">
                                <div
                                    className="bg-primary-600 rounded-t-lg transition-all duration-500 group-hover:bg-primary-400 cursor-pointer shadow-lg shadow-primary-100"
                                    style={{ height: `${h * 2}px` }}
                                ></div>
                                <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {h}%
                                </div>
                            </div>
                            <p className="text-[9px] font-black text-gray-400 text-center uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
