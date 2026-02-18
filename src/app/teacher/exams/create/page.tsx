'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
    Plus,
    Trash2,
    HelpCircle,
    CheckCircle2,
    FileText,
    Save,
    ChevronLeft,
    Timer,
    Layout
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type QuestionType = 'MCQ' | 'WRITTEN';

interface Question {
    id: string;
    type: QuestionType;
    text: string;
    marks: number;
    // MCQ specific
    options?: { A: string; B: string; C: string; D: string };
    correctAnswer?: string;
    // Written specific
    wordLimit?: number;
}

export default function CreateExamPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [examData, setExamData] = useState({
        title: '',
        description: '',
        courseId: '',
        duration: 60,
        totalMarks: 0,
        passingMarks: 40,
        type: 'MCQ' as 'MCQ' | 'WRITTEN' | 'MIXED',
    });

    const [questions, setQuestions] = useState<Question[]>([]);

    const addQuestion = (type: QuestionType) => {
        const newQuestion: Question = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            text: '',
            marks: 1,
            ...(type === 'MCQ' ? {
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: 'A',
            } : {
                wordLimit: 0,
            })
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
    };

    const handleSave = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/teacher/dashboard');
        }, 1500);
    };

    return (
        <DashboardLayout allowedRoles={['TEACHER']}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ChevronLeft size={20} />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create New Exam</h1>
                        <p className="text-sm text-gray-500">Define your questions and exam settings.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">Save Draft</Button>
                    <Button onClick={handleSave} loading={loading} className="px-8 shadow-lg shadow-primary-200">
                        <Save size={18} className="mr-2" /> Publish Exam
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Questions List */}
                <div className="lg:col-span-2 space-y-6">
                    {questions.length === 0 ? (
                        <Card className="border-dashed border-2 bg-gray-50/50 py-16 text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 shadow-sm">
                                <HelpCircle size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No questions added yet</h3>
                            <p className="text-gray-500 mb-8">Click one of the buttons below to start adding questions.</p>
                            <div className="flex justify-center gap-4">
                                <Button variant="outline" onClick={() => addQuestion('MCQ')} className="bg-white border-2">
                                    <Plus size={18} className="mr-2" /> Add MCQ
                                </Button>
                                <Button variant="outline" onClick={() => addQuestion('WRITTEN')} className="bg-white border-2">
                                    <Plus size={18} className="mr-2" /> Add Written
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <>
                            {questions.map((q, index) => (
                                <Card key={q.id} className="border-none shadow-sm overflow-hidden group">
                                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question {index + 1} • {q.type}</span>
                                        <button
                                            onClick={() => removeQuestion(q.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <Input
                                            placeholder="Enter question text..."
                                            fullWidth
                                            value={q.text}
                                            onChange={(e) => updateQuestion(q.id, { text: e.target.value })}
                                        />

                                        {q.type === 'MCQ' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                {['A', 'B', 'C', 'D'].map((opt) => (
                                                    <div key={opt} className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateQuestion(q.id, { correctAnswer: opt })}
                                                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all ${q.correctAnswer === opt
                                                                ? 'bg-primary-600 border-primary-600 text-white shadow-md'
                                                                : 'border-gray-200 text-gray-400 hover:border-primary-400'
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                        <Input
                                                            placeholder={`Option ${opt}`}
                                                            fullWidth
                                                            value={q.options?.[opt as keyof typeof q.options] || ''}
                                                            onChange={(e) => {
                                                                const newOpts = { ...q.options, [opt]: e.target.value };
                                                                updateQuestion(q.id, { options: newOpts as any });
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-6 text-sm text-gray-500 mt-2 bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} className="text-primary-600" />
                                                    <span>Student will provide a written response or PDF upload.</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-gray-500">Marks:</span>
                                                <input
                                                    type="number"
                                                    className="w-20 px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                    value={q.marks}
                                                    onChange={(e) => updateQuestion(q.id, { marks: parseInt(e.target.value) || 0 })}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <div className="flex justify-center gap-4 py-8">
                                <Button variant="outline" onClick={() => addQuestion('MCQ')} className="bg-white border-2 border-primary-100 hover:border-primary-500 transition-all">
                                    <Plus size={18} className="mr-2" /> Add MCQ Question
                                </Button>
                                <Button variant="outline" onClick={() => addQuestion('WRITTEN')} className="bg-white border-2 border-primary-100 hover:border-primary-500 transition-all">
                                    <Plus size={18} className="mr-2" /> Add Written Question
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                {/* Right: Settings Sidebar */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm sticky top-8">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Layout size={20} className="text-primary-600" /> Exam Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Input
                                label="Exam Title"
                                placeholder="e.g. Mathematics Midterm"
                                fullWidth
                                value={examData.title}
                                onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                                    placeholder="Enter exam instructions and details..."
                                    value={examData.description}
                                    onChange={(e) => setExamData({ ...examData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Duration (Min)</label>
                                    <div className="relative">
                                        <Timer size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            value={examData.duration}
                                            onChange={(e) => setExamData({ ...examData, duration: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Passing Marks</label>
                                    <div className="relative">
                                        <CheckCircle2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="number"
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            value={examData.passingMarks}
                                            onChange={(e) => setExamData({ ...examData, passingMarks: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-gray-500">Total Questions</span>
                                    <span className="font-bold">{questions.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Total Marks</span>
                                    <span className="font-bold text-primary-600 text-lg">
                                        {questions.reduce((sum, q) => sum + q.marks, 0)}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Shuffle Questions</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Enable Camera Proctoring</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Prevent Tab Switching</span>
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
