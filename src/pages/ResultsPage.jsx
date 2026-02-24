import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { getAnalysisById, updateAnalysis } from '../utils/analysisLogic';
import {
    ArrowLeft,
    CheckCircle2,
    ListTodo,
    CalendarDays,
    HelpCircle,
    TrendingUp,
    Download,
    Copy,
    ChevronRight,
    Sparkles,
    Circle
} from 'lucide-react';

export default function ResultsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [confidenceMap, setConfidenceMap] = useState({});
    const [liveScore, setLiveScore] = useState(0);

    useEffect(() => {
        const data = getAnalysisById(id);
        if (!data) {
            navigate('/history');
            return;
        }
        setAnalysis(data);
        setConfidenceMap(data.skillConfidenceMap || {});
        setLiveScore(data.readinessScore);
    }, [id]);

    const toggleSkill = (skill) => {
        const current = confidenceMap[skill] || 'practice';
        const next = current === 'know' ? 'practice' : 'know';

        const newMap = { ...confidenceMap, [skill]: next };
        setConfidenceMap(newMap);

        // Live score update logic:
        // +2 for each 'know', -2 for each 'practice' (relative to base)
        // We calculate from the aggregate changes
        const allSkills = Object.values(analysis.extractedSkills).flat();
        let scoreAdjustment = 0;

        allSkills.forEach(s => {
            const conf = newMap[s] || 'practice';
            if (conf === 'know') scoreAdjustment += 2;
            else scoreAdjustment -= 2;
        });

        const newScore = Math.max(0, Math.min(100, analysis.readinessScore + scoreAdjustment));
        setLiveScore(newScore);

        // Persist
        const updated = { ...analysis, skillConfidenceMap: newMap, readinessScore: newScore };
        updateAnalysis(updated);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        alert(`${type} copied to clipboard!`);
    };

    const downloadTxt = () => {
        const sections = [
            `PREPARATION PLAN FOR ${analysis.company || 'Analysis'} - ${analysis.role || 'Role'}`,
            `Generated: ${new Date(analysis.createdAt).toLocaleString()}`,
            `Readiness Score: ${liveScore}/100`,
            `\n--- 7-DAY PLAN ---`,
            analysis.dayPlan.map(d => `${d.day}: ${d.topics}`).join('\n'),
            `\n--- ROUND CHECKLIST ---`,
            analysis.checklist.map(r => `${r.round}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n'),
            `\n--- INTERVIEW QUESTIONS ---`,
            analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')
        ];

        const element = document.createElement("a");
        const file = new Blob([sections.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Prep_Plan_${analysis.company || 'Analysis'}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    if (!analysis) return null;

    const allSkills = Object.values(analysis.extractedSkills).flat();
    const weakSkills = allSkills.filter(s => confidenceMap[s] !== 'know').slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <Link to="/history" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
                    <ArrowLeft size={18} />
                    Back to History
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        onClick={downloadTxt}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <Download size={16} /> Download TXT
                    </button>
                </div>
            </div>

            <header className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{analysis.company || 'Company Target'}</h1>
                    <p className="text-lg text-slate-500 font-medium">{analysis.role || 'Software Engineer'}</p>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10 transition-all">
                    <div className="text-right">
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">Interactive Score</p>
                        <p className="text-4xl font-black text-primary">{liveScore}/100</p>
                    </div>
                    <TrendingUp className="text-primary" size={32} />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">

                    {/* Skills Section */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between border-none pb-0">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={22} className="text-primary" />
                                <CardTitle className="text-xl">Skill Self-Assessment</CardTitle>
                            </div>
                            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1.5 text-emerald-500">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Know
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Practice
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <p className="text-sm text-slate-500 mb-6 font-medium">Toggle skills you've mastered to update your readiness score in real-time.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                                    <div key={category} className="space-y-3 p-5 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{category}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(skill => {
                                                const isKnown = confidenceMap[skill] === 'know';
                                                return (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`
                              px-4 py-2 rounded-xl text-xs font-black border transition-all flex items-center gap-2 shadow-sm
                              ${isKnown
                                                                ? 'bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600'
                                                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary/40'}
                            `}
                                                    >
                                                        {isKnown ? <CheckCircle2 size={12} strokeWidth={3} /> : <Circle size={12} strokeWidth={3} className="text-slate-300" />}
                                                        {skill}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Interview Questions */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <HelpCircle size={22} className="text-primary" />
                                <CardTitle className="text-xl">10 Core Interview Questions</CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.questions.join('\n'), 'Questions')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 hover:text-primary transition-all rounded-lg text-xs font-bold border border-slate-200"
                            >
                                <Copy size={14} /> Copy All
                            </button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {analysis.questions.map((q, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group">
                                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-black text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            {i + 1}
                                        </span>
                                        <p className="text-slate-700 font-bold text-sm pt-1.5 leading-relaxed">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* Action Box */}
                    <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles size={120} />
                        </div>
                        <CardContent className="pt-8 relative z-10">
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                <Sparkles size={24} />
                                <h3 className="font-black text-xs uppercase tracking-[0.2em]">Next Step Roadmap</h3>
                            </div>
                            {weakSkills.length > 0 ? (
                                <>
                                    <p className="text-slate-400 text-sm font-bold mb-4 leading-relaxed">
                                        Master <span className="text-white underline decoration-primary decoration-2 underline-offset-4">{weakSkills.join(', ')}</span> to boost your preparedness.
                                    </p>
                                    <div className="p-5 bg-white/5 rounded-2xl mb-8 border border-white/10 group cursor-pointer hover:bg-white/10 transition-all">
                                        <div className="flex items-center justify-between">
                                            <span className="font-extrabold text-sm">Start Day 1-2 Basics</span>
                                            <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-slate-400 text-sm font-bold mb-8 leading-relaxed">
                                    Excellent! You've mastered all detected skills. Time to simulate a mock interview or tackle Day 6.
                                </p>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-primary text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="bg-white/10 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10"
                                >
                                    Back to Top
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 7-Day Plan */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={22} className="text-primary" />
                                <CardTitle className="text-xl">7-Day Prep Plan</CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.dayPlan.map(d => `${d.day}: ${d.topics}`).join('\n'), 'Plan')}
                                className="text-slate-300 hover:text-primary transition-all p-1.5"
                            >
                                <Copy size={18} />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analysis.dayPlan.map((plan, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:border-primary/30 transition-all shadow-sm">
                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">{plan.day}</p>
                                    <p className="text-sm font-extrabold text-slate-800 leading-snug">{plan.topics}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Round-wise Checklist */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ListTodo size={22} className="text-primary" />
                                <CardTitle className="text-xl">Round Checklist</CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.checklist.map(r => `${r.round}: ${r.items.join(', ')}`).join('\n'), 'Checklist')}
                                className="text-slate-300 hover:text-primary transition-all p-1.5"
                            >
                                <Copy size={18} />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {analysis.checklist.map((round, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-3">{round.round}</h4>
                                    <ul className="space-y-3">
                                        {round.items.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-600 leading-tight group cursor-default">
                                                <div className="mt-0.5 w-4 h-4 rounded-md bg-slate-50 border border-slate-200 flex-shrink-0 group-hover:border-primary/30 transition-colors" />
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
