import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { getHistory } from '../utils/analysisLogic';
import { Search, History as HistoryIcon, ArrowRight, ExternalLink } from 'lucide-react';

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const filteredHistory = history.filter(item =>
        (item.company || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.role || '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <HistoryIcon className="text-primary" size={28} />
                        Analysis History
                    </h1>
                    <p className="text-slate-500">Access all your previous job description analyses and preparation plans.</p>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by company or role..."
                        className="pl-12 pr-6 py-3 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-80 transition-all font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {filteredHistory.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {filteredHistory.map((item) => (
                        <Link key={item.id} to={`/results/${item.id}`}>
                            <Card className="hover:border-primary/30 transition-all group overflow-visible">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                                {item.company?.[0] || '?'}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                                                    {item.company || 'Unknown Company'}
                                                    <ExternalLink size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
                                                </h3>
                                                <p className="text-slate-500 font-semibold text-sm mb-2">{item.role || 'Software Engineer'}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                                                    Analyzed on {new Date(item.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                                            <div className="text-right">
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Score</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-2xl font-black ${item.readinessScore > 70 ? 'text-emerald-500' : 'text-primary'}`}>
                                                        {item.readinessScore}
                                                    </span>
                                                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${item.readinessScore > 70 ? 'bg-emerald-500' : 'bg-primary'}`}
                                                            style={{ width: `${item.readinessScore}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card className="bg-slate-50/50 border-dashed border-2 py-20 flex flex-col items-center justify-center text-center">
                    <HistoryIcon className="text-slate-200 mb-4" size={64} />
                    <h3 className="text-xl font-bold text-slate-600 mb-2">No Analysis Found</h3>
                    <p className="text-slate-400 max-w-sm">
                        You haven't analyzed any job descriptions yet. Go to Assessments to start your first analysis.
                    </p>
                    <Link to="/assessments" className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                        Start Analysis
                    </Link>
                </Card>
            )}
        </div>
    );
}
