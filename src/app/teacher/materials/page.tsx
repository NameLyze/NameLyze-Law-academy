'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import {
    FileVideo,
    FileText,
    Upload,
    Plus,
    FolderOpen,
    Trash2,
    Eye,
    ChevronRight,
    Search
} from 'lucide-react';

export default function MaterialsPage() {
    const [materials, setMaterials] = useState([
        { id: '1', title: 'Bar Council MCQ Practice Set', type: 'PDF', size: '2.5 MB', date: 'Feb 15, 2026', chapter: 'Bar Council' },
        { id: '2', title: 'Civil Procedure Code Lecture 04', type: 'VIDEO', size: '450 MB', date: 'Feb 12, 2026', chapter: 'CPC' },
        { id: '3', title: 'Evidence Act Section 1-10 Notes', type: 'PDF', size: '1.2 MB', date: 'Feb 10, 2026', chapter: 'Evidence Act' },
    ]);

    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadForm, setUploadForm] = useState({ title: '', type: 'PDF', chapter: 'General' });

    const handleUpload = () => {
        const newMaterial = {
            id: Date.now().toString(),
            title: uploadForm.title,
            type: uploadForm.type,
            size: uploadForm.type === 'VIDEO' ? '300 MB' : '1.5 MB',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            chapter: uploadForm.chapter
        };
        setMaterials([newMaterial, ...materials]);
        setIsUploadModalOpen(false);
        setUploadForm({ title: '', type: 'PDF', chapter: 'General' });
    };

    const handleDelete = (id: string) => {
        setMaterials(materials.filter(m => m.id !== id));
    };

    return (
        <DashboardLayout allowedRoles={['TEACHER', 'ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-[#a81c22]/5 text-[#a81c22] text-[10px] font-black rounded-full uppercase tracking-widest border border-[#a81c22]/10 italic">Library</span>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Teaching Materials</span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">সংগৃহীত আইন <span className="text-[#a81c22]">নোটসমূহ</span></h1>
                </div>
                <Button
                    className="bg-[#a81c22] hover:bg-black text-white shadow-xl shadow-[#a81c22]/20 rounded-2xl py-7 px-8 font-black uppercase italic tracking-widest text-xs h-auto"
                    onClick={() => setIsUploadModalOpen(true)}
                >
                    <Upload size={20} className="mr-2" /> Upload New Content
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Sidebar - Focus on Chapters */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="bg-gray-50 border-b border-gray-100 p-6">
                            <CardTitle className="text-xs uppercase tracking-[0.2em] text-[#a81c22] font-black italic">Categorization</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <nav className="space-y-1">
                                {['All Contents', 'Bar Council', 'CPC', 'Evidence Act', 'Penal Code'].map((cat, i) => (
                                    <button
                                        key={i}
                                        className={`w-full text-left px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all italic ${i === 0 ? 'bg-[#a81c22] text-white shadow-lg shadow-[#a81c22]/20' : 'text-gray-500 hover:bg-gray-50 hover:text-[#a81c22]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </nav>
                            <Button variant="outline" fullWidth className="mt-6 border-dashed border-2 border-gray-200 text-gray-400 hover:text-[#a81c22] hover:border-[#a81c22]/20 py-4 h-auto font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all" onClick={() => alert('Add New Folder...')}>
                                <Plus size={16} className="mr-2" /> Add Selection
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Storage Info Card */}
                    <div className="p-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a81c22]/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-xl border border-white/10 shadow-inner">
                                <FolderOpen size={28} className="text-[#f39c12]" />
                            </div>
                            <h3 className="font-black text-xl italic uppercase mb-2">Cloud Archive</h3>
                            <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-[0.3em] font-bold">4.2 GB of 10 GB Securely Used</p>
                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-8 border border-white/5">
                                <div className="w-[42%] h-full bg-gradient-to-r from-[#a81c22] to-[#f39c12]"></div>
                            </div>
                            <Button fullWidth className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-gray-900 font-black italic uppercase tracking-widest text-[10px] py-4 h-auto rounded-xl shadow-xl">
                                Expand Storage
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Materials List */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#a81c22] transition-colors">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Find legal notes, lectures or PDFs..."
                            className="w-full bg-white border border-gray-100 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-bold shadow-sm focus:shadow-xl focus:border-transparent focus:outline-none transition-all placeholder:text-gray-300 italic"
                        />
                    </div>

                    <Card padding={false} className="border-none shadow-xl rounded-[2.5rem] overflow-hidden bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/80 border-b border-gray-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-[#a81c22] uppercase tracking-[0.3em] italic">Information Asset</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Section</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] italic">Metric</th>
                                        <th className="px-4 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic text-right">Control</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {materials.map((m) => (
                                        <tr key={m.id} className="group hover:bg-gray-50/80 transition-all duration-300">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-5">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner border transition-all duration-500 group-hover:scale-110 ${m.type === 'VIDEO' ? 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white' :
                                                        'bg-red-50 text-[#a81c22] border-red-100 group-hover:bg-[#a81c22] group-hover:text-white'
                                                        }`}>
                                                        {m.type === 'VIDEO' ? <FileVideo size={24} /> : <FileText size={24} />}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-900 text-lg italic leading-tight mb-1 group-hover:text-[#a81c22] transition-colors">{m.title}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{m.type}</span>
                                                            <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest italic">{m.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="px-4 py-1.5 bg-gray-100 text-gray-600 text-[9px] font-black uppercase tracking-widest rounded-full italic">{m.chapter}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[10px] font-black text-gray-300 uppercase italic tracking-widest">{m.size}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-3 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                                    <button className="p-3 text-gray-400 hover:text-[#a81c22] hover:bg-[#a81c22]/5 rounded-xl transition-all shadow-sm hover:shadow-md"><Eye size={20} /></button>
                                                    <button
                                                        onClick={() => handleDelete(m.id)}
                                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm hover:shadow-md"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Upload Modal */}
            <Modal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                title="UPLOAD LEGAL ASSET"
            >
                <div className="space-y-6 p-2">
                    <Input
                        label="Material Title"
                        placeholder="Enter Descriptive Title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                        fullWidth
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Category</label>
                            <select
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-4 text-xs font-black uppercase tracking-widest outline-none focus:border-[#a81c22] transition-all"
                                value={uploadForm.chapter}
                                onChange={(e) => setUploadForm({ ...uploadForm, chapter: e.target.value })}
                            >
                                <option>General</option>
                                <option>Bar Council</option>
                                <option>CPC</option>
                                <option>Evidence Act</option>
                                <option>Penal Code</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Type</label>
                            <div className="flex gap-2">
                                {['PDF', 'VIDEO'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setUploadForm({ ...uploadForm, type: t as any })}
                                        className={`flex-1 py-4 rounded-xl font-black italic uppercase tracking-widest text-[10px] transition-all border-2 ${uploadForm.type === t
                                                ? 'bg-[#a81c22] border-[#a81c22] text-white shadow-lg'
                                                : 'bg-white border-gray-100 text-gray-500'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="border-2 border-dashed border-gray-100 rounded-3xl p-12 text-center group hover:border-[#a81c22]/20 transition-all cursor-pointer">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload size={24} className="text-gray-300 group-hover:text-[#a81c22]" />
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">Drop documents/video or <span className="text-[#a81c22]">Click Browse</span></p>
                    </div>
                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => setIsUploadModalOpen(false)}
                            className="rounded-xl font-black uppercase italic tracking-widest text-xs py-4"
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            onClick={handleUpload}
                            disabled={!uploadForm.title}
                            className={`rounded-xl font-black uppercase italic tracking-widest text-xs py-4 shadow-xl transition-all ${uploadForm.title ? 'bg-[#a81c22] hover:bg-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            Confirm Upload
                        </Button>
                    </div>
                </div>
            </Modal>
        </DashboardLayout>
    );
}
