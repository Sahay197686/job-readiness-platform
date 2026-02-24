import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    ClipboardCheck,
    Library,
    UserCircle
} from 'lucide-react';

export default function DashboardLayout() {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Practice', icon: Code2, path: '/practice' },
        { name: 'Assessments', icon: ClipboardCheck, path: '/assessments' },
        { name: 'Resources', icon: Library, path: '/resources' },
        { name: 'Profile', icon: UserCircle, path: '/profile' },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                        <span className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">P</span>
                        Placement Prep
                    </h2>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors
                ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h1 className="text-lg font-semibold text-slate-800">Placement Prep</h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-medium">
                            JD
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
