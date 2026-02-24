import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Checkbox } from '../components/ui/Checkbox';
import { AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEST_ITEMS = [
    { id: 'jd-req', label: 'JD required validation works', hint: 'Go to Assessments, try submitting empty textarea.' },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a few words in JD and see the amber warning.' },
    { id: 'skills-group', label: 'Skills extraction groups correctly', hint: 'Check Results page "Skill Self-Assessment" categories.' },
    { id: 'round-map', label: 'Round mapping changes based on company + skills', hint: 'Compare "Amazon" (Enterprise) vs "SmallStartup" rounds.' },
    { id: 'deterministic', label: 'Score calculation is deterministic', hint: 'Same JD always yields same Base Score.' },
    { id: 'score-live', label: 'Skill toggles update score live', hint: 'Toggle a skill on Results and watch "Stability Score".' },
    { id: 'persistence', label: 'Changes persist after refresh', hint: 'Master a skill, refresh page, check if still mastered.' },
    { id: 'history-sync', label: 'History saves and loads correctly', hint: 'Run analysis, go to /history, reload it.' },
    { id: 'export-btn', label: 'Export buttons copy the correct content', hint: 'Click "Copy All" and paste into a notepad.' },
    { id: 'console-clean', label: 'No console errors on core pages', hint: 'Open F12 DevTools and check for red errors.' }
];

export default function TestChecklistPage() {
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('prp_test_checklist', JSON.stringify(checklist));
    }, [checklist]);

    const handleToggle = (id) => {
        setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const resetChecklist = () => {
        if (window.confirm('Reset all progress?')) {
            setChecklist({});
        }
    };

    const passedCount = Object.values(checklist).filter(v => v).length;
    const isComplete = passedCount === 10;

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">QA Checklist</h1>
                <div className={`p-6 rounded-2xl border transition-all ${isComplete ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-black uppercase tracking-widest ${isComplete ? 'text-emerald-700' : 'text-amber-700'}`}>
                            Tests Passed: {passedCount} / 10
                        </span>
                        {isComplete ? (
                            <CheckCircle2 className="text-emerald-500" size={24} />
                        ) : (
                            <AlertCircle className="text-amber-500" size={24} />
                        )}
                    </div>
                    <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden mb-4">
                        <div
                            className={`h-full transition-all duration-500 ${isComplete ? 'bg-emerald-500' : 'bg-amber-500'}`}
                            style={{ width: `${(passedCount / 10) * 100}%` }}
                        />
                    </div>
                    {!isComplete && (
                        <p className="text-amber-700 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                            <AlertCircle size={14} /> Fix issues before shipping.
                        </p>
                    )}
                    {isComplete && (
                        <p className="text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Ready for production.
                        </p>
                    )}
                </div>
            </header>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">Required Verifications</CardTitle>
                    <button
                        onClick={resetChecklist}
                        className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
                    >
                        <RotateCcw size={12} /> Reset checklist
                    </button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {TEST_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer select-none
                                ${checklist[item.id] ? 'bg-emerald-50/30 border-emerald-100' : 'bg-white border-slate-100 hover:border-primary/20'}
                            `}
                            onClick={() => handleToggle(item.id)}
                        >
                            <div className="pt-0.5">
                                <Checkbox
                                    checked={!!checklist[item.id]}
                                    onCheckedChange={() => handleToggle(item.id)}
                                />
                            </div>
                            <div className="space-y-1">
                                <p className={`text-sm font-bold ${checklist[item.id] ? 'text-emerald-900 line-through opacity-70' : 'text-slate-800'}`}>
                                    {item.label}
                                </p>
                                <p className="text-[11px] text-slate-400 font-medium italic">
                                    Hint: {item.hint}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Link
                    to={isComplete ? "/prp/08-ship" : "#"}
                    onClick={(e) => !isComplete && e.preventDefault()}
                    className={`
                        px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg
                        ${isComplete
                            ? 'bg-primary text-white hover:bg-primary-hover shadow-primary/20 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                    `}
                >
                    Proceed to Shipping
                </Link>
            </div>
        </div>
    );
}
