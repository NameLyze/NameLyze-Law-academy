'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    CheckCircle2,
    XCircle,
    Clock,
    BarChart3,
    ArrowLeft,
    Download,
    Share2,
    FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExamResultPage() {
    const router = useRouter();

    // Mock result data
    const result = {
        examTitle: 'Advanced Calculus Midterm',
        status: 'GRADED',
        score: 42,
        totalMarks: 50,
        percentage: 84,
        passingMarks: 25,
        submittedAt: 'Oct 24, 2023 11:45 AM',
        timeTaken: '1h 45m',
        feedback: 'Excellent work! Your understanding of derivatives is very strong. I noticed some small errors in the written explanation of the FTC, but overall very good.',
        mcqResults: {
            total: 15,
            correct: 13,
            marks: 26
        },
        writtenResults: {
            marks: 16,
            maxMarks: 20
        }
    };

    const isPassed = result.score >= result.passingMarks;

    return (
        <DashboardLayout allowedRoles={['STUDENT']}>
            <div className="flex items-center gap-4 mb-8">
                <Button variant="ghost" size="sm" onClick={() => router.push('/student/dashboard')}>
                    <ArrowLeft size={20} />
                </Button>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    Exam Result: <span className="text-primary-600">{result.examTitle}</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Result Summary Card */}
                <Card className="lg:col-span-1 border-none shadow-xl overflow-hidden rounded-3xl h-fit">
                    <div className={`p-8 text-center text-white ${isPassed ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30 backdrop-blur-sm">
                            {isPassed ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                        </div>
                        <h2 className="text-3xl font-black mb-1">{isPassed ? 'CONGRATS!' : 'KEEP GOING!'}</h2>
                        <p className="text-white/80 font-bold uppercase tracking-widest text-sm">You {isPassed ? 'Passed' : 'Failed'} the Exam</p>
                    </div>
                    <CardContent className="p-8 space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-gray-100">
                            <span className="text-gray-500 font-medium">Final Score</span>
                            <div className="text-right">
                                <span className="text-2xl font-black text-gray-900">{result.score}/{result.totalMarks}</span>
                                <p className={`text-xs font-bold leading-none ${isPassed ? 'text-green-600' : 'text-red-600'}`}>{result.percentage}%</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                                    <Clock size={14} /> Submitted
                                </div>
                                <span className="text-gray-900 font-semibold">{result.submittedAt}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                                    <BarChart3 size={14} /> Time Taken
                                </div>
                                <span className="text-gray-900 font-semibold">{result.timeTaken}</span>
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col gap-3">
                            <Button className="w-full bg-primary-600 shadow-lg shadow-primary-200 h-12 rounded-2xl font-bold">
                                <Download size={18} className="mr-2" /> Download Certificate
                            </Button>
                            <Button variant="outline" className="w-full border-2 h-12 rounded-2xl font-bold">
                                <Share2 size={18} className="mr-2" /> Share Result
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <div className="lg:col-span-2 space-y-6">
                    <section>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <BarChart3 className="text-primary-600" size={24} /> Performance Breakdown
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="border-none shadow-sm p-6 bg-white/50 backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-900">MCQ Section</h3>
                                        <p className="text-xs text-gray-500">{result.mcqResults.correct} Correct out of {result.mcqResults.total}</p>
                                    </div>
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><CheckCircle2 size={20} /></div>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(result.mcqResults.correct / result.mcqResults.total) * 100}%` }}></div>
                                </div>
                                <p className="text-right text-xs font-black text-blue-600">{result.mcqResults.marks} MARKS</p>
                            </Card>

                            <Card className="border-none shadow-sm p-6 bg-white/50 backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-gray-900">Written Section</h3>
                                        <p className="text-xs text-gray-500">Graded by Teacher</p>
                                    </div>
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><FileText size={20} /></div>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full mb-2">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(result.writtenResults.marks / result.writtenResults.maxMarks) * 100}%` }}></div>
                                </div>
                                <p className="text-right text-xs font-black text-purple-600">{result.writtenResults.marks} MARKS</p>
                            </Card>
                        </div>
                    </section>

                    <Card className="border-none shadow-sm p-8 bg-primary-50">
                        <h3 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                            <FileText className="text-primary-600" size={20} /> Teacher's Feedback
                        </h3>
                        <div className="relative">
                            <span className="absolute -top-4 -left-2 text-6xl text-primary-200 select-none">"</span>
                            <p className="text-primary-800 leading-relaxed italic z-10 relative pl-4">
                                {result.feedback}
                            </p>
                            <span className="absolute -bottom-10 -right-2 text-6xl text-primary-200 select-none">"</span>
                        </div>
                        <div className="mt-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary-600 shadow-sm border border-primary-100">
                                DR
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900 leading-none">Dr. Robert Fox</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Course Instructor</p>
                            </div>
                        </div>
                    </Card>

                    <section className="pt-4">
                        <h2 className="text-xl font-bold mb-4">Answer Review</h2>
                        <Card className="border-none shadow-sm p-4 bg-white/50 border border-white text-center">
                            <p className="text-gray-500 text-sm py-4">Detailed answer review is available only if the teacher enables it for this exam.</p>
                            <Button variant="ghost" className="text-primary-600 font-bold" disabled>Request Review Unlock</Button>
                        </Card>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
}
