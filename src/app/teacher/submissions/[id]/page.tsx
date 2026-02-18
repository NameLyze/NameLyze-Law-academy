'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import {
    ChevronLeft,
    FileText,
    Download,
    CheckCircle2,
    AlertCircle,
    MessageSquare,
    Save,
    User
} from 'lucide-react';

export default function GradingPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // Mock submission data
    const submission = {
        id: id,
        student: 'John Doe',
        avatar: 'JD',
        exam: 'Calculus Final - Written Section',
        course: 'Advanced Mathematics',
        submittedAt: 'Oct 18, 2023 at 02:45 PM',
        status: 'PENDING',
        attachments: [
            { name: 'John_Doe_Calculus_Final.pdf', size: '2.4 MB' },
            { name: 'Supporting_Charts.jpg', size: '1.2 MB' },
        ],
        answers: [
            { question: 'Q1: Derive the formula for integration by parts.', studentAnswer: 'The integration by parts formula is derived from the product rule of differentiation...' },
            { question: 'Q2: Solve the differential equation dy/dx = 2xy.', studentAnswer: 'Separating variables gives dy/y = 2xdx. Integrating both sides: ln|y| = x^2 + C...' },
        ]
    };

    const [score, setScore] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleBack = () => router.back();

    return (
        <DashboardLayout allowedRoles={['TEACHER']}>
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary-600 font-bold uppercase tracking-widest text-[10px] mb-6 transition-colors group"
                >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Submissions
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Submission Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-[10px] font-bold rounded uppercase tracking-widest border border-orange-100 italic mb-2 inline-block">Reviewing Submission</span>
                                        <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tight">{submission.exam}</h1>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{submission.course}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Submitted On</p>
                                        <p className="text-sm font-bold text-gray-900">{submission.submittedAt}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <div className="flex items-center gap-4 p-6 bg-primary-50/30 rounded-[2rem] border border-primary-100">
                                    <div className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-primary-200">
                                        {submission.avatar}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">Submitted By</p>
                                        <h3 className="text-xl font-black text-gray-900 uppercase italic leading-none">{submission.student}</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Student ID: #STU-1284</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {submission.answers.map((ans, i) => (
                                        <div key={i} className="space-y-3">
                                            <h4 className="font-black text-gray-900 uppercase italic text-sm tracking-tight flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary-600"></div>
                                                {ans.question}
                                            </h4>
                                            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 text-sm leading-relaxed italic">
                                                "{ans.studentAnswer}"
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-black text-gray-900 uppercase italic text-sm tracking-tight">Attached Files</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {submission.attachments.map((file, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all group">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={20} className="text-gray-400" />
                                                    <div className="text-left">
                                                        <p className="text-xs font-bold text-gray-900 truncate w-32 md:w-auto">{file.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Grading Form */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-2xl rounded-[2.5rem] sticky top-24">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-black italic uppercase text-gray-900 mb-6 flex items-center gap-2">
                                    <CheckCircle2 size={24} className="text-green-500" /> Grade Student
                                </h3>

                                <div className="space-y-6">
                                    <Input
                                        label="Numerical Score (out of 100)"
                                        placeholder="e.g. 85"
                                        type="number"
                                        value={score}
                                        onChange={(e) => setScore(e.target.value)}
                                        fullWidth
                                    />

                                    <TextArea
                                        label="Teacher Feedback"
                                        placeholder="Provide detailed feedback for the student..."
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        fullWidth
                                    />

                                    <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                                        <Button
                                            fullWidth
                                            className="bg-primary-600 shadow-xl shadow-primary-200 py-6 h-auto font-black italic uppercase tracking-widest rounded-2xl"
                                            onClick={() => alert(`Submitted Grade: ${score}/100`)}
                                        >
                                            <Save size={18} className="mr-2" /> SUBMIT GRADE
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="ghost"
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 py-4 h-auto font-bold uppercase tracking-widest text-[10px] rounded-2xl"
                                            onClick={() => alert('Marked as needs revision')}
                                        >
                                            <AlertCircle size={16} className="mr-2" /> REQUEST REVISION
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-8 bg-gray-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-black italic uppercase mb-2 flex items-center gap-2">
                                    <MessageSquare size={20} className="text-primary-400" /> Private Comment
                                </h3>
                                <p className="text-xs text-gray-400 mb-4 font-bold uppercase">Visible only to you and admins</p>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all min-h-[80px]"
                                    placeholder="Add a private note..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
