import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { getAnalysisById } from '../utils/analysisLogic';
import { ArrowLeft, CheckCircle2, ListTodo, CalendarDays, HelpCircle, TrendingUp } from 'lucide-react';

export default function ResultsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        const data = getAnalysisById(id);
        if (!data) {
            navigate('/history');
            return;
        }
        setAnalysis(data);
    }, [id]);

    if (!analysis) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <Link to="/history" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
                    <ArrowLeft size={18} />
                    Back to History
                </Link>
                <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Generated On</p>
                    <p className="text-sm font-semibold text-slate-600">
                        {new Date(analysis.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{analysis.company || 'Company'}</h1>
                    <p className="text-lg text-slate-500 font-medium">{analysis.role || 'Software Engineer'}</p>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
                    <div className="text-right">
                        <p className="text-xs text-primary font-bold uppercase tracking-wider">Readiness Score</p>
                        <p className="text-3xl font-black text-primary">{analysis.readinessScore}/100</p>
                    </div>
                    <TrendingUp className="text-primary" size={32} />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Skills and Questions */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Extracted Skills */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <CheckCircle2 size={20} className="text-primary" />
                            <CardTitle>Extracted Skill Categories</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                                    <div key={category} className="space-y-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{category}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => (
                                                <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-semibold border border-slate-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <HelpCircle size={20} className="text-primary" />
                            <CardTitle>Top 10 Likely Interview Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {analysis.questions.map((q, i) => (
                                    <div key={i} className="flex gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                            {i + 1}
                                        </span>
                                        <p className="text-slate-700 font-medium pt-1 leading-relaxed">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Plan and Checklist */}
                <div className="space-y-8">
                    {/* 7-Day Plan */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <CalendarDays size={20} className="text-primary" />
                            <CardTitle>7-Day Prep Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {analysis.dayPlan.map((plan, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                                        <p className="text-xs font-bold text-primary uppercase">{plan.day}</p>
                                        <p className="text-sm font-semibold text-slate-800 leading-snug">{plan.topics}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Round-wise Checklist */}
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-2">
                            <ListTodo size={20} className="text-primary" />
                            <CardTitle>Round-wise Checklist</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {analysis.checklist.map((round, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">{round.round}</h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 font-medium">
                                                <div className="mt-1 w-3 h-3 rounded-sm border border-slate-300 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
