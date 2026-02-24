import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { GitCommitVertical, HelpCircle } from 'lucide-react';

export default function RoundMappingTimeline({ rounds }) {
    if (!rounds || rounds.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <GitCommitVertical size={22} className="text-primary" />
                    <CardTitle className="text-xl">Interview Round Mapping</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                    {rounds.map((round, idx) => (
                        <div key={idx} className="relative group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-primary ring-4 ring-white group-hover:scale-125 transition-transform" />

                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{round.round}</p>
                                <h4 className="text-base font-extrabold text-slate-800">{round.focus}</h4>

                                <div className="mt-3 flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-transparent group-hover:border-slate-200 group-hover:bg-white transition-all">
                                    <HelpCircle size={14} className="text-slate-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                        <span className="text-slate-400 mr-1 uppercase text-[9px]">Why it matters:</span>
                                        {round.why}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
