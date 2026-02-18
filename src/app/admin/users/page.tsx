'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
    Mail,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';

export default function AdminUsersPage() {
    const users = [
        { id: '1', name: 'Alice Student', email: 'alice@example.com', role: 'STUDENT', status: 'ACTIVE', joined: 'Oct 20, 2023' },
        { id: '2', name: 'Dr. Robert Fox', email: 'robert@example.com', role: 'TEACHER', status: 'ACTIVE', joined: 'Oct 15, 2023' },
        { id: '3', name: 'Bob Smith', email: 'bob@example.com', role: 'STUDENT', status: 'INACTIVE', joined: 'Oct 12, 2023' },
        { id: '4', name: 'Admin Jane', email: 'admin@example.com', role: 'ADMIN', status: 'ACTIVE', joined: 'Sep 01, 2023' },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-green-100 italic">Active</span>;
            case 'INACTIVE':
                return <span className="px-2 py-1 bg-red-50 text-red-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-red-100 italic">Inactive</span>;
            default:
                return <span className="px-2 py-1 bg-gray-50 text-gray-700 text-[10px] font-bold rounded-full uppercase tracking-wider border border-gray-100 italic">Pending</span>;
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[10px] font-bold rounded uppercase tracking-wider border border-purple-100">Administrator</span>;
            case 'TEACHER':
                return <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded uppercase tracking-wider border border-blue-100">Instructor</span>;
            case 'STUDENT':
                return <span className="px-2 py-1 bg-orange-50 text-orange-700 text-[10px] font-bold rounded uppercase tracking-wider border border-orange-100">Learner</span>;
            default:
                return role;
        }
    };

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage system access, roles, and user accounts.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="shadow-lg shadow-primary-200 h-11 px-6 rounded-2xl" href="/admin/users/new">
                        <UserPlus size={18} className="mr-2" /> Invite New User
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="border-b border-gray-50 bg-white p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <CardTitle className="text-lg font-bold flex items-center gap-2">
                            <Users className="text-primary-600" size={20} /> Total Users (420)
                        </CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary-500 w-full md:w-64"
                                />
                            </div>
                            <Button variant="outline" size="sm" className="rounded-xl border-gray-200">
                                <Filter size={16} />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-50">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Role / Access</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center font-bold text-primary-600">
                                                    {user.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 leading-none">{user.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getRoleBadge(user.role)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(user.status)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                                            {user.joined}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <Shield size={16} className="text-gray-400" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <Mail size={16} className="text-gray-400" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-xl hover:bg-white hover:shadow-sm">
                                                    <MoreHorizontal size={16} className="text-gray-400" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Showing 1-4 of 420 users</p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl px-4 bg-white" disabled>Previous</Button>
                            <Button variant="outline" size="sm" className="rounded-xl px-4 bg-white font-bold text-primary-600 border-primary-100">1</Button>
                            <Button variant="outline" size="sm" className="rounded-xl px-4 bg-white">2</Button>
                            <Button variant="outline" size="sm" className="rounded-xl px-4 bg-white">Next</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
