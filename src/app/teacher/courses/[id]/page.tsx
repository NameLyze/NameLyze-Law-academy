'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import {
    Users,
    FileText,
    Settings,
    Plus,
    BarChart2,
    ChevronRight,
    Edit3,
    Trash2,
    Play
} from 'lucide-react';

export default function TeacherCourseDetailsPage() {
    const params = useParams();
    const id = params.id;

    // State for course data
    const [course, setCourse] = useState({
        id: id,
        title: 'Bar Preli Revision Batch-1',
        code: 'LAW-BPR-01',
        students: 45,
        exams: 3,
        averagePerformance: '78%',
        nextExam: 'Oct 28, 2023',
        materials: [
            { id: '1', title: 'Chapter 1: Limits & Continuity', type: 'VIDEO', views: 124, date: 'Oct 10' },
            { id: '2', title: 'Calculus Exercises Set A', type: 'PDF', downloads: 38, date: 'Oct 12' },
            { id: '3', title: 'Derivatives Masterclass', type: 'VIDEO', views: 98, date: 'Oct 15' },
        ]
    });

    // Modals State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddMaterialModalOpen, setIsAddMaterialModalOpen] = useState(false);

    // Form States
    const [editForm, setEditForm] = useState({ title: course.title, code: course.code });
    const [materialForm, setMaterialForm] = useState({ title: '', type: 'VIDEO' });

    const handleEditSave = () => {
        setCourse({ ...course, title: editForm.title, code: editForm.code });
        setIsEditModalOpen(false);
    };

    const handleAddMaterial = () => {
        const newMaterial = {
            id: Date.now().toString(),
            title: materialForm.title,
            type: materialForm.type as 'VIDEO' | 'PDF',
            views: 0,
            downloads: 0,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
        setCourse({
            ...course,
            materials: [newMaterial, ...course.materials]
        });
        setMaterialForm({ title: '', type: 'VIDEO' });
        setIsAddMaterialModalOpen(false);
    };

    const handleDeleteMaterial = (mId: string) => {
        setCourse({
            ...course,
            materials: course.materials.filter(m => m.id !== mId)
        });
    };

    return (
        <DashboardLayout allowedRoles={['TEACHER']}>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-[#a81c22]/5 text-[#a81c22] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#a81c22]/10 italic">
                            Course Manager
                        </span>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{course.code}</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">{course.title}</h1>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsEditModalOpen(true)}
                        className="bg-white border-gray-200 hover:border-[#a81c22] hover:text-[#a81c22] transition-all rounded-xl py-6 px-6 font-black uppercase italic tracking-widest text-xs"
                    >
                        <Edit3 size={18} className="mr-2" /> Edit Details
                    </Button>
                    <Button
                        onClick={() => setIsAddMaterialModalOpen(true)}
                        className="bg-[#a81c22] hover:bg-black text-white shadow-xl shadow-[#a81c22]/20 rounded-xl py-6 px-6 font-black uppercase italic tracking-widest text-xs"
                    >
                        <Plus size={18} className="mr-2" /> Add Material
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { label: 'Active Students', value: course.students, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Exams', value: course.exams, icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Avg. Success', value: course.averagePerformance, icon: BarChart2, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow rounded-3xl overflow-hidden">
                        <CardContent className="pt-6 relative">
                            <div className="flex items-center gap-6">
                                <div className={`p-5 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={26} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tight italic">{stat.value}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                        <h2 className="text-2xl font-black italic uppercase tracking-tight text-gray-900">Manage Materials</h2>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{course.materials.length} Items Total</span>
                    </div>

                    <div className="space-y-4">
                        {course.materials.length > 0 ? (
                            course.materials.map((m) => (
                                <div key={m.id} className="p-6 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between hover:shadow-xl hover:border-transparent transition-all group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#a81c22] group-hover:text-white transition-all border border-gray-100 group-hover:border-transparent shadow-inner">
                                            {m.type === 'VIDEO' ? <Play size={22} /> : <FileText size={22} />}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-gray-900 text-lg group-hover:text-[#a81c22] transition-colors">{m.title}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${m.type === 'VIDEO' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    {m.type}
                                                </span>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {m.type === 'VIDEO' ? `${m.views} Views` : `${m.downloads} Downloads`} • Added {m.date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                        <button className="p-3 text-gray-400 hover:text-[#a81c22] hover:bg-[#a81c22]/5 rounded-xl transition-all"><Settings size={20} /></button>
                                        <button
                                            onClick={() => handleDeleteMaterial(m.id)}
                                            className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                                <p className="text-gray-400 font-black italic uppercase tracking-widest">No materials added yet</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 border-b border-gray-100 pb-4">Settings</h2>
                    <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest italic">Visibility</span>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black rounded-full uppercase tracking-widest border border-green-100 shadow-sm">Public</span>
                                </div>
                                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest italic">Enrollment</span>
                                    <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[9px] font-black rounded-full uppercase tracking-widest shadow-sm">Manual</span>
                                </div>
                            </div>
                            <Button fullWidth variant="outline" className="border-[#a81c22]/20 text-[#a81c22] hover:bg-red-50 py-5 h-auto font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all italic">
                                Archive This Course
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10 text-center space-y-6">
                            <h3 className="text-xl font-black italic uppercase tracking-tighter">Announcements</h3>
                            <p className="text-xs text-gray-400 font-bold leading-relaxed">Broadcast updates, schedules or legal insights to all registered students instantly.</p>
                            <Button className="w-full bg-[#f39c12] hover:bg-white hover:text-gray-900 border-none font-black italic uppercase tracking-widest py-5 h-auto rounded-2xl shadow-lg transition-all">
                                Send Broadcast
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Details Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="EDIT COURSE DETAILS"
            >
                <div className="space-y-6 p-2">
                    <Input
                        label="Course Title"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        fullWidth
                    />
                    <Input
                        label="Course Code"
                        value={editForm.code}
                        onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                        fullWidth
                    />
                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => setIsEditModalOpen(false)}
                            className="rounded-xl font-black uppercase italic tracking-widest text-xs py-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleEditSave}
                            className="bg-[#a81c22] hover:bg-black rounded-xl font-black uppercase italic tracking-widest text-xs py-4 shadow-xl"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Add Material Modal */}
            <Modal
                isOpen={isAddMaterialModalOpen}
                onClose={() => setIsAddMaterialModalOpen(false)}
                title="ADD NEW MATERIAL"
            >
                <div className="space-y-6 p-2">
                    <Input
                        label="Material Title"
                        placeholder="e.g. Criminal Law Basics"
                        value={materialForm.title}
                        onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                        fullWidth
                    />
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Material Type</label>
                        <div className="flex gap-4">
                            {['VIDEO', 'PDF'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setMaterialForm({ ...materialForm, type })}
                                    className={`flex-1 py-4 rounded-xl font-black italic uppercase tracking-widest text-xs transition-all border-2 ${materialForm.type === type
                                            ? 'bg-[#a81c22] border-[#a81c22] text-white shadow-lg'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => setIsAddMaterialModalOpen(false)}
                            className="rounded-xl font-black uppercase italic tracking-widest text-xs py-4"
                        >
                            Discard
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleAddMaterial}
                            disabled={!materialForm.title}
                            className={`rounded-xl font-black uppercase italic tracking-widest text-xs py-4 shadow-xl transition-all ${materialForm.title ? 'bg-[#a81c22] hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Upload Material
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
