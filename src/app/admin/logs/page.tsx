'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Activity,
    Search,
    Filter,
    Download,
    Clock,
    Shield,
    AlertCircle,
    ChevronLeft,
    Terminal
} from 'lucide-react';

export default function LogsPage() {
    const logs = [
        { id: '1', event: 'User Authentication', user: 'admin@examtracker.com', status: 'SUCCESS', ip: '192.168.1.1', time: '2 mins ago', severity: 'low' },
        { id: '2', event: 'Course Mutation', user: 'teacher@examtracker.com', status: 'MODIFIED', ip: '192.168.1.45', time: '15 mins ago', severity: 'medium' },
        { id: '3', event: 'System Config Update', user: 'admin@examtracker.com', status: 'CHANGED', ip: '192.168.1.1', time: '1 hour ago', severity: 'high' },
        { id: '4', event: 'Unusual Login Pattern', user: 'anonymous', status: 'BLOCKED', ip: '45.12.33.1', time: '3 hours ago', severity: 'critical' },
        { id: '5', event: 'Database Backup', user: 'SYSTEM', status: 'COMPLETED', ip: 'INTERNAL', time: '5 hours ago', severity: 'low' },
    ];

    const getSeverityStyle = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500 text-white';
            case 'high': return 'bg-orange-500 text-white';
            case 'medium': return 'bg-indigo-500 text-white';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <DashboardLayout allowedRoles={['ADMIN']}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tighter italic uppercase flex items-center gap-3">
                        <Terminal className="text-primary-600" size={32} /> System Logs
                    </h1>
                    <p className="text-gray-500 mt-1 font-bold italic uppercase text-xs tracking-widest">Real-time infrastructure audit trail</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-11 px-6 rounded-2xl bg-white border-gray-200">
                        <Download size={18} className="mr-2" /> Export CSV
                    </Button>
                    <Button className="h-11 px-6 rounded-2xl shadow-lg shadow-primary-200">
                        <Activity size={18} className="mr-2" /> Live stream
                    </Button>
                </div>
            </div>

            <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
                <div className="bg-gray-50/50 p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search logs by user, event, or IP..."
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-bold italic"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none h-11 px-4 bg-white rounded-xl text-[10px] font-black italic uppercase tracking-widest">
                            <Filter size={16} className="mr-2" /> Filter Severity
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none h-11 px-4 bg-white rounded-xl text-[10px] font-black italic uppercase tracking-widest">
                            <Clock size={16} className="mr-2" /> Last 24h
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/30 border-b border-gray-50">
                            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] italic">
                                <th className="px-8 py-5">Event Detail</th>
                                <th className="px-8 py-5">Initiator</th>
                                <th className="px-8 py-5">IP Address</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] uppercase shadow-sm ${getSeverityStyle(log.severity)}`}>
                                                {log.severity[0]}
                                            </div>
                                            <p className="font-black text-gray-900 uppercase italic tracking-tight text-sm">{log.event}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs font-bold text-gray-600 italic group-hover:text-primary-600 transition-colors">{log.user}</p>
                                    </td>
                                    <td className="px-8 py-6 font-mono text-[10px] font-bold text-gray-400 tracking-wider">
                                        {log.ip}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[9px] font-black rounded uppercase tracking-widest border border-gray-200 italic group-hover:bg-white transition-colors">
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-bold text-gray-400 italic text-xs">
                                        {log.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-gray-50/30 border-t border-gray-50 flex items-center justify-center">
                    <Button variant="ghost" className="text-gray-400 hover:text-primary-600 font-black italic uppercase tracking-widest text-xs">
                        View Historical Archive (90 Days)
                    </Button>
                </div>
            </Card>
        </DashboardLayout>
    );
}
