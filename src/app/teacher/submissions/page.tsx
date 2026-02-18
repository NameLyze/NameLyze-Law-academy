'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ClipboardList,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle,
    Eye,
    Checksquare,
    MoreVertical
} from 'lucide-react';

export default function TeacherSubmissionsPage() {
    const submissions = [
        { id: '1', student: 'Alice Student', exam: 'Calculus Final', submitted: '2 hours ago', status: 'PENDING', score: null },
        { id: '2', student: 'Bob Smith', exam: 'Calculus Final', submitted: '5 hours ago', status: 'GRADED', score: '85/100' },
        { id: '3', student: 'Charlie Davis', exam: 'Geometry Quiz', submitted: 'Yesterday', status: 'PENDING', score: null },
        { id: '4', student: 'Diana Prince', exam: 'Calculus Final', submitted: 'Yesterday', status: 'GRADED', score: '92/100' },
    ];

    return (
        <DashboardLayout allowedRoles={['TEACHER', 'ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Student Submissions</h1>
                    <p className="text-gray-500 mt-1">Review and grade examinations submitted by students.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="bg-white border-primary-200 text-primary-600 font-bold">
                        Bulk Grade MCQ
                    </Button>
                    <Button className="shadow-lg shadow-primary-200">
                        Generate Reports
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="p-8 border-b border-gray-50 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-8">
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900 leading-none">12</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Pending Grading</p>
                            </div>
                            <div className="w-px h-10 bg-gray-100"></div>
                            <div className="text-center">
                                <p className="text-2xl font-black text-gray-900 leading-none">148</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Total Submissions</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search student or exam..."
                                    className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 w-full md:w-64"
                                />
                            </div>
                            <Button variant="outline" className="bg-white rounded-2xl text-gray-400 border-gray-100">
                                <Filter size={18} />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                                    <th className="px-8 py-5">Student</th>
                                    <th className="px-8 py-5">Exam Module</th>
                                    <th className="px-8 py-5">Submitted At</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center font-bold text-primary-600 shadow-sm border border-primary-100">
                                                    {sub.student[0]}
                                                </div>
                                                <span className="font-bold text-gray-900 group-hover:text-primary-700 transition-colors uppercase italic">{sub.student}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="font-bold text-gray-700 text-sm">{sub.exam}</p>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium italic">
                                            {sub.submitted}
                                        </td>
                                        <td className="px-8 py-6">
                                            {sub.status === 'PENDING' ? (
                                                <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-amber-100">Needs Review</span>
                                            ) : (
                                                <div className="flex flex-col">
                                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-green-100 w-fit">Graded</span>
                                                    <span className="text-xs font-black text-primary-600 mt-1">{sub.score}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" className="h-10 rounded-xl hover:bg-white hover:shadow-sm font-bold text-xs text-primary-600">
                                                    {sub.status === 'PENDING' ? 'Open Grading' : 'View Results'}
                                                </Button>
                                                <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <MoreVertical size={16} className="text-gray-400" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
