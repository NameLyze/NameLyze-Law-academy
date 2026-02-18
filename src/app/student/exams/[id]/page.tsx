'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Clock,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Send,
    Eye,
    EyeOff,
    Maximize
} from 'lucide-react';
import { clsx } from 'clsx';

export default function ExamTakingPage() {
    const router = useRouter();
    const params = useParams();
    const examId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [exam, setExam] = useState<any>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Mock data for demo
    useEffect(() => {
        // In real app, fetch exam details which includes questions
        const mockExam = {
            id: examId,
            title: 'Advanced Calculus Midterm',
            duration: 60, // minutes
            totalMarks: 50,
            questions: [
                {
                    id: 'q1',
                    type: 'MCQ',
                    text: 'What is the derivative of sin(x)?',
                    marks: 2,
                    options: { A: 'cos(x)', B: '-cos(x)', C: 'tan(x)', D: 'sec(x)' }
                },
                {
                    id: 'q2',
                    type: 'MCQ',
                    text: 'Evaluate the integral of 2x dx from 0 to 2.',
                    marks: 3,
                    options: { A: '2', B: '4', C: '6', D: '8' }
                },
                {
                    id: 'q3',
                    type: 'WRITTEN',
                    text: 'Explain the Fundamental Theorem of Calculus and its applications in engineering.',
                    marks: 10,
                    wordLimit: 500
                }
            ]
        };

        setExam(mockExam);
        setTimeLeft(mockExam.duration * 60);
        setLoading(false);
    }, [examId]);

    // Timer logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleAutoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Proctoring: Tab switch detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitches(prev => prev + 1);
                alert('Warning: Tab switching is monitored. This activity has been logged.');
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const handleAnswer = (questionId: string, answer: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleAutoSubmit = () => {
        console.log('Time up! Auto-submitting...');
        submitExam();
    };

    const submitExam = async () => {
        setLoading(true);
        // Simulate API call to /api/exams/submit
        setTimeout(() => {
            router.push(`/student/exams/${examId}/result`);
        }, 2000);
    };

    if (loading || !exam) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Preparing exam environment...</p>
                </div>
            </div>
        );
    }

    const currentQuestion = exam.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
            {/* Exam Header */}
            <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-xl">
                        <Maximize size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Student ID: ST2024001</p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className={clsx(
                        "flex items-center gap-3 px-6 py-2 rounded-2xl border-2 transition-all duration-500",
                        timeLeft < 300
                            ? "bg-red-50 border-red-200 text-red-600 animate-pulse"
                            : "bg-gray-50 border-gray-100 text-gray-700"
                    )}>
                        <Clock size={20} />
                        <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
                    </div>

                    <Button
                        onClick={() => {
                            if (confirm('Are you sure you want to submit your exam now?')) {
                                submitExam();
                            }
                        }}
                        className="shadow-lg shadow-primary-200 bg-primary-600 hover:bg-primary-700"
                    >
                        Submit Exam
                    </Button>
                </div>
            </header>

            <div className="flex-1 overflow-hidden flex">
                {/* Main Exam Content */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="max-w-4xl mx-auto py-8">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
                                Question {currentQuestionIndex + 1} of {exam.questions.length}
                            </span>
                            <span className="text-sm font-bold text-primary-600">{currentQuestion.marks} Points</span>
                        </div>

                        <Card className="border-none shadow-xl shadow-gray-200/50 mb-8 rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <CardContent className="p-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-10 leading-relaxed">
                                    {currentQuestion.text}
                                </h2>

                                {currentQuestion.type === 'MCQ' ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(currentQuestion.options).map(([key, value]) => (
                                            <button
                                                key={key}
                                                onClick={() => handleAnswer(currentQuestion.id, key)}
                                                className={clsx(
                                                    "flex items-center gap-6 p-6 rounded-2xl border-2 text-left transition-all group",
                                                    answers[currentQuestion.id] === key
                                                        ? "border-primary-600 bg-primary-50 shadow-md shadow-primary-100 ring-4 ring-primary-500/10"
                                                        : "border-gray-100 hover:border-primary-200 hover:bg-gray-50"
                                                )}
                                            >
                                                <span className={clsx(
                                                    "w-12 h-12 flex items-center justify-center rounded-xl font-bold text-lg transition-colors shadow-sm",
                                                    answers[currentQuestion.id] === key
                                                        ? "bg-primary-600 text-white"
                                                        : "bg-white text-gray-400 group-hover:text-primary-600"
                                                )}>
                                                    {key}
                                                </span>
                                                <span className={clsx(
                                                    "text-lg font-medium transition-colors",
                                                    answers[currentQuestion.id] === key ? "text-primary-900" : "text-gray-600"
                                                )}>
                                                    {value as string}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <textarea
                                            placeholder="Type your answer here..."
                                            className="w-full h-80 p-6 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-600 transition-all text-lg leading-relaxed"
                                            value={answers[currentQuestion.id] || ''}
                                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-between items-center px-2">
                                            <p className="text-xs text-gray-400 font-bold uppercase">Word Limit: {currentQuestion.wordLimit} Words</p>
                                            <label className="cursor-pointer group flex items-center gap-2 text-sm text-primary-600 font-bold">
                                                <input type="file" className="hidden" accept=".pdf" />
                                                <span className="group-hover:underline">Or Upload PDF Instead</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex justify-between items-center">
                            <Button
                                variant="outline"
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                className="h-14 px-8 rounded-2xl border-2"
                            >
                                <ChevronLeft className="mr-2" /> Previous
                            </Button>

                            <div className="flex gap-2">
                                {exam.questions.map((_: any, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentQuestionIndex(i)}
                                        className={clsx(
                                            "w-3 h-3 rounded-full transition-all duration-300",
                                            currentQuestionIndex === i
                                                ? "bg-primary-600 w-8"
                                                : answers[exam.questions[i].id]
                                                    ? "bg-primary-200"
                                                    : "bg-gray-200"
                                        )}
                                    ></button>
                                ))}
                            </div>

                            <Button
                                onClick={() => isLastQuestion ? submitExam() : setCurrentQuestionIndex(prev => prev + 1)}
                                className="h-14 px-8 rounded-2xl shadow-xl shadow-primary-200"
                            >
                                {isLastQuestion ? (
                                    <>Submit Exam <Send className="ml-2" size={18} /></>
                                ) : (
                                    <>Next Question <ChevronRight className="ml-2" size={18} /></>
                                )}
                            </Button>
                        </div>
                    </div>
                </main>

                {/* Exam Navigation Sidebar */}
                <aside className="w-80 bg-white border-l border-gray-100 p-8 hidden lg:flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                        Question Map
                    </h3>
                    <div className="grid grid-cols-4 gap-3 flex-1 overflow-y-auto content-start">
                        {exam.questions.map((q: any, i: number) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(i)}
                                className={clsx(
                                    "aspect-square rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all",
                                    currentQuestionIndex === i
                                        ? "border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-200"
                                        : answers[q.id]
                                            ? "border-primary-100 bg-primary-50 text-primary-700"
                                            : "border-gray-100 text-gray-400 hover:border-gray-200"
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                        <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                            <div className="flex items-center gap-3 text-orange-700 mb-1">
                                <AlertCircle size={18} />
                                <span className="text-sm font-bold uppercase tracking-wider">Tab Switches</span>
                            </div>
                            <p className="text-2xl font-black text-orange-800">{tabSwitches}</p>
                        </div>

                        <div className="relative group rounded-3xl overflow-hidden aspect-video bg-gray-900 shadow-xl ring-4 ring-white">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <EyeOff className="text-white/20 animate-pulse" size={48} />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 py-2 px-3 bg-black/60 backdrop-blur-md rounded-xl flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Proctoring</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
