import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { analyzeJD, saveToHistory } from '../utils/analysisLogic';
import { Wand2, AlertCircle } from 'lucide-react';

export default function AssessmentsPage() {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [error, setError] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = () => {
        if (!jdText.trim()) {
            setError('Please paste a job description to start the analysis.');
            return;
        }
        setError('');
        setAnalyzing(true);

        // Simulate analysis delay
        setTimeout(() => {
            const analysis = analyzeJD(jdText, company, role);
            saveToHistory(analysis);
            setAnalyzing(false);
            navigate(`/results/${analysis.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AI Job Description Analysis</h1>
                <p className="text-slate-500">Paste the job description below to generate a tailored preparation plan and likely interview questions.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Analysis Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Company Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Google, Amazon, StartupX"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Job Role</label>
                            <input
                                type="text"
                                placeholder="e.g. Frontend Developer, SDE-1"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Job Description</label>
                        <textarea
                            rows="12"
                            placeholder="Paste the full job description here..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                            value={jdText}
                            onChange={(e) => setJdText(e.target.value)}
                        ></textarea>
                        <p className="text-[11px] text-slate-400 font-medium">Pro tip: Long JDs (&gt;800 chars) provide more accurate skill detection.</p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm border border-red-100">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className={`
              w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
              ${analyzing
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-primary hover:bg-primary-hover text-white shadow-primary/20 active:scale-[0.98]'}
            `}
                    >
                        {analyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                                Analyzing Job Requirements...
                            </>
                        ) : (
                            <>
                                <Wand2 size={20} />
                                Analyze JD & Generate Plan
                            </>
                        )}
                    </button>
                </CardContent>
            </Card>
        </div>
    );
}
