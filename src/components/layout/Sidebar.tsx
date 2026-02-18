'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, onClose }) => {
  const pathname = usePathname();

  const menuItems = {
    STUDENT: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
      { name: 'My Courses', icon: BookOpen, path: '/student/courses' },
      { name: 'Exams', icon: ClipboardList, path: '/student/exams' },
      { name: 'Analytics', icon: BarChart3, path: '/student/analytics' },
    ],
    TEACHER: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
      { name: 'My Courses', icon: BookOpen, path: '/teacher/courses' },
      { name: 'Materials', icon: BookOpen, path: '/teacher/materials' },
      { name: 'Exams', icon: ClipboardList, path: '/teacher/exams' },
      { name: 'Submissions', icon: ClipboardList, path: '/teacher/submissions' },
      { name: 'Analytics', icon: BarChart3, path: '/teacher/analytics' },
    ],
    ADMIN: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { name: 'Users', icon: User, path: '/admin/users' },
      { name: 'Courses', icon: BookOpen, path: '/admin/courses' },
      { name: 'Settings', icon: Settings, path: '/admin/settings' },
    ],
  };

  const currentMenu = menuItems[role] || menuItems.STUDENT;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col shadow-xl lg:shadow-none">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-black text-[#a81c22] flex items-center gap-2 italic uppercase tracking-tighter">
          <div className="w-8 h-8 bg-[#a81c22] rounded flex items-center justify-center text-white text-xs non-italic">N</div>
          Namelyze
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {currentMenu.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={clsx(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-[#a81c22] text-white shadow-lg shadow-[#a81c22]/20"
                  : "text-gray-600 hover:bg-[#a81c22]/5 hover:text-[#a81c22]"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={clsx(
                  "transition-colors",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-[#a81c22]"
                )} />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
