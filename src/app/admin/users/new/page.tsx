'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import {
    UserPlus,
    ChevronLeft,
    ShieldCheck,
    Mail,
    Lock,
    Send,
    UserCircle
} from 'lucide-react';

export default function NewUserPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'STUDENT',
        password: 'password123'
    });

    const handleBack = () => router.back();

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary-600 font-bold uppercase tracking-widest text-[10px] mb-8 transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Users List
                </button>

                <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 rounded-[2rem] bg-primary-600 text-white flex items-center justify-center shadow-xl shadow-primary-200">
                        <UserPlus size={40} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase leading-none">Create Account</h1>
                        <p className="text-gray-400 font-bold uppercase tracking-widest mt-2 italic text-xs">Provision system access for new personnel</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                            <CardContent className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="Full Name"
                                        placeholder="Enter account name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        fullWidth
                                    />
                                    <Input
                                        label="Primary Email"
                                        placeholder="email@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        fullWidth
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Select
                                        label="System Role"
                                        options={[
                                            { value: 'STUDENT', label: 'Student' },
                                            { value: 'TEACHER', label: 'Teacher' },
                                            { value: 'ADMIN', label: 'Administrator' },
                                        ]}
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        fullWidth
                                    />
                                    <Input
                                        label="Temporary Password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        fullWidth
                                    />
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                                    <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs h-12 px-6 rounded-2xl" onClick={handleBack}>
                                        Cancel
                                    </Button>
                                    <Button className="h-12 px-10 rounded-2xl shadow-xl shadow-primary-200 font-black italic uppercase tracking-tighter" onClick={() => alert('Account created successfully!')}>
                                        <Send size={18} className="mr-2" /> PROVISION ACCESS
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card className="bg-gray-900 border-none shadow-xl rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                                    <ShieldCheck size={24} className="text-primary-500" /> Security
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Lock size={16} className="text-gray-400" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Must change password on first login</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                                        <Mail size={16} className="text-gray-400" />
                                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">Send welcome invitation email</p>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-primary-600/10 rounded-full blur-3xl"></div>
                        </Card>

                        <div className="p-8 border border-dashed border-gray-200 rounded-[2.5rem] text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserCircle size={32} className="text-gray-300" />
                            </div>
                            <h4 className="font-bold text-gray-900 uppercase italic text-sm tracking-tight mb-2">Bulk Invite</h4>
                            <p className="text-xs text-gray-400 mb-6 italic">Need to add multiple users at once? Use our CSV importer.</p>
                            <Button variant="outline" fullWidth className="border-gray-200 text-gray-500 hover:text-primary-600 hover:border-primary-100 h-11 rounded-xl text-[10px] font-black italic uppercase tracking-widest">
                                UPLOAD CSV FILE
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
