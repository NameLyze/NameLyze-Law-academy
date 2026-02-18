'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Users,
    Shield,
    Settings as SettingsIcon,
    Activity,
    MoreHorizontal,
    Plus,
    ArrowUpRight,
    TrendingDown,
    UserCheck,
    UserX,
    Lock
} from 'lucide-react';

export default function AdminDashboard() {
    const [recentUsers, setRecentUsers] = useState([
        { id: '1', name: 'Dr. Robert Fox', email: 'robert@examtracker.com', role: 'TEACHER', status: 'ACTIVE', joined: '2 days ago' },
        { id: '2', name: 'Jane Cooper', email: 'jane@student.com', role: 'STUDENT', status: 'ACTIVE', joined: '5 days ago' },
        { id: '3', name: 'Guy Hawkins', email: 'guy@teacher.com', role: 'TEACHER', status: 'INACTIVE', joined: '1 week ago' },
    ]);

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase">Admin <span className="text-[#a81c22]">Console</span></h1>
                    <p className="text-gray-400 font-bold uppercase tracking-widest mt-2 italic text-xs">Full system control and performance monitoring for Namelyze</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="bg-white border-gray-200 rounded-xl font-bold uppercase tracking-widest text-[10px]" href="/admin/logs">System Logs</Button>
                    <Button className="bg-[#a81c22] hover:bg-black text-white rounded-xl font-black italic uppercase tracking-widest text-[10px] px-8 py-6 h-auto shadow-xl shadow-red-900/10" href="/admin/users/new">
                        <Plus size={18} className="mr-2" /> Invite Teacher/Admin
                    </Button>
                </div>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', growth: '+12%' },
                    { label: 'System Load', value: '38%', icon: Activity, color: 'text-green-600', bg: 'bg-green-50', growth: 'Optimal' },
                    { label: 'Subscriptions', value: '$12.4k', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50', growth: '+5.4%' },
                    { label: 'Active Sessions', value: '42', icon: Shield, color: 'text-orange-600', bg: 'bg-orange-50', growth: 'Normal' },
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-sm hover:translate-y-[-4px] transition-all duration-300">
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.growth.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
                                    {stat.growth}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Management Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Recent User Activity</h2>
                        <Button variant="ghost" size="sm" className="text-primary-600" href="/admin/users">View All Users</Button>
                    </div>

                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">User</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Role</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentUsers.map((user) => (
                                        <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${user.role === 'ADMIN' ? 'bg-red-50 text-red-600' :
                                                    user.role === 'TEACHER' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    <span className="text-xs font-semibold text-gray-600">{user.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"><SettingsIcon size={16} /></button>
                                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Lock size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* System Performance Placeholder */}
                    <section className="pt-4">
                        <h2 className="text-xl font-bold mb-4">System Performance</h2>
                        <Card className="border-none shadow-sm h-64 bg-white flex items-center justify-center">
                            <div className="text-center">
                                <Activity size={48} className="text-primary-100 mx-auto mb-2 animate-pulse" />
                                <p className="text-gray-400 font-medium">Real-time performance metrics will appear here.</p>
                            </div>
                        </Card>
                    </section>
                </div>

                {/* Sidebar - Quick Actions & Security */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-xl font-bold mb-4">Quick Tasks</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: 'Audit System Logs', icon: Activity, color: 'primary' },
                                { label: 'Manage Roles', icon: Shield, color: 'indigo' },
                                { label: 'Security Scan', icon: Lock, color: 'orange' },
                                { label: 'Backup Database', icon: ArrowUpRight, color: 'blue' },
                            ].map((task, i) => (
                                <button key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white transition-colors">
                                            <task.icon size={18} className={`text-${task.color}-600`} />
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">{task.label}</span>
                                    </div>
                                    <Plus size={16} className="text-gray-300 group-hover:text-primary-600" />
                                </button>
                            ))}
                        </div>
                    </section>

                    <Card className="bg-gray-900 text-white border-none shadow-2xl relative overflow-hidden">
                        <CardContent className="p-8">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-2">Emergency Access</h3>
                                <p className="text-gray-400 text-sm mb-6">Restricted system-wide lockdown and critical security controls.</p>
                                <Button className="w-full bg-red-600 hover:bg-red-700 border-none font-bold py-6 rounded-2xl shadow-lg shadow-red-900/50">
                                    <Lock size={18} className="mr-2" /> Activate Lockdown
                                </Button>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
