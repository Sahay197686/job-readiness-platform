import React from 'react';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from '../components/ui/Card';
import {
    CheckCircle2,
    Clock,
    ArrowRight,
    Calendar
} from 'lucide-react';

const radarData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. Overall Readiness */}
                <Card className="flex flex-col items-center justify-center p-8">
                    <CardHeader className="border-none pb-0 text-center w-full">
                        <CardTitle>Overall Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <div className="relative w-48 h-48">
                            {/* SVG Circular Progress */}
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-slate-100 stroke-current"
                                    strokeWidth="8"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    className="text-primary stroke-current transition-all duration-1000 ease-out"
                                    strokeWidth="8"
                                    strokeDasharray={`${72 * 2.51}, 251.2`}
                                    strokeLinecap="round"
                                    fill="transparent"
                                    r="40"
                                    cx="50"
                                    cy="50"
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-slate-800 tracking-tight">72</span>
                                <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Score</span>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 font-medium">Readiness Score</p>
                    </CardContent>
                </Card>

                {/* 2. Skill Breakdown (Radar Chart) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 3. Continue Practice */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-base">Continue Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <h4 className="font-bold text-slate-900">Dynamic Programming</h4>
                            <p className="text-sm text-slate-500 mb-4">Intermediate • 12 Problems Left</p>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                                <div className="bg-primary h-full w-[30%] rounded-full"></div>
                            </div>
                            <div className="flex justify-between text-xs font-semibold text-slate-600">
                                <span>3/10 Completed</span>
                                <span>30%</span>
                            </div>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
                            Continue <ArrowRight size={16} />
                        </button>
                    </CardContent>
                </Card>

                {/* 4. Weekly Goals */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-base">Weekly Goals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-slate-800">Problems Solved</span>
                                <span className="text-xs font-bold text-primary">12/20 this week</span>
                            </div>
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-primary h-full w-[60%] rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-between px-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${i < 4 ? 'bg-primary text-white shadow-sm ring-2 ring-primary/20' : 'bg-slate-100 text-slate-400'}`}>
                                        {i < 4 ? <CheckCircle2 size={12} /> : day}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-bold">{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 5. Upcoming Assessments */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="text-base">Upcoming</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM', icon: Clock },
                            { title: 'System Design Review', time: 'Wed, 2:00 PM', icon: Calendar },
                            { title: 'HR Interview Prep', time: 'Friday, 11:00 AM', icon: UserCircle },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary shrink-0">
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}
