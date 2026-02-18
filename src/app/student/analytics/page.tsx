'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Clock,
    Target,
    BookOpen,
    Calendar,
    Download,
    Filter
} from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <DashboardLayout allowedRoles={['STUDENT', 'TEACHER', 'ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics Dashboard</h1>
                    <p className="text-gray-500 mt-1">Detailed performance tracking and statistical insights.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white rounded-2xl border-gray-100">
                        <Calendar size={18} className="mr-2" /> Custom Range
                    </Button>
                    <Button className="shadow-xl shadow-primary-200 rounded-2xl h-11 px-6">
                        <Download size={18} className="mr-2" /> Export Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-none shadow-sm rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 text-white p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                <TrendingUp size={24} />
                            </div>
                            <h4 className="font-bold text-sm text-primary-100">Overall Average</h4>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black">88.4%</h2>
                            <span className="text-xs font-bold text-green-300">+2.4% vs last week</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm rounded-3xl p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Clock size={24} />
                            </div>
                            <h4 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Efficiency</h4>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black text-gray-900">42m</h2>
                            <span className="text-xs font-bold text-gray-400">Avg. per MCQ exam</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-sm rounded-3xl p-2">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                <Target size={24} />
                            </div>
                            <h4 className="font-bold text-sm text-gray-500 uppercase tracking-widest">Goal Completion</h4>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-4xl font-black text-gray-900">92%</h2>
                            <span className="text-xs font-bold text-purple-400">Weekly Target met</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-md border border-white/20">
                    <CardHeader className="bg-white p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tight text-gray-900 flex items-center justify-between">
                            Score Distribution
                            <Button variant="ghost" size="sm" className="rounded-xl">
                                <Filter size={16} />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center p-8">
                        <div className="text-center">
                            <div className="relative w-48 h-48 mx-auto mb-8">
                                <div className="absolute inset-0 rounded-full border-[12px] border-gray-50"></div>
                                <div className="absolute inset-0 rounded-full border-[12px] border-primary-500 border-t-transparent border-l-transparent rotate-45 shadow-lg shadow-primary-200"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-black text-gray-900">76</span>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Percentile</span>
                                </div>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider italic">Performance is 15% better than last month</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white/50 backdrop-blur-md border border-white/20">
                    <CardHeader className="bg-white p-8 border-b border-gray-50">
                        <CardTitle className="text-xl font-black tracking-tight text-gray-900">Subject Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {[
                            { subject: 'Mathematics', score: 92, color: 'bg-blue-500', trend: 'up' },
                            { subject: 'Physics', score: 78, color: 'bg-purple-500', trend: 'down' },
                            { subject: 'Chemistry', score: 85, color: 'bg-green-500', trend: 'up' },
                            { subject: 'English', score: 94, color: 'bg-orange-500', trend: 'up' },
                        ].map((s) => (
                            <div key={s.subject} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest leading-none">{s.subject}</h4>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1">Mastery Level</p>
                                    </div>
                                    <span className="text-lg font-black text-gray-900 leading-none">{s.score}%</span>
                                </div>
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${s.color} rounded-full transition-all duration-1000`}
                                        style={{ width: `${s.score}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
