import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Building2, Users2, Landmark, Target, Info } from 'lucide-react';

export default function CompanyIntelCard({ intel }) {
    if (!intel) return null;

    const { name, industry, sizeCategory, hiringFocus, isEnterprise, isDemo } = intel;

    return (
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="bg-primary/5 pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary">
                        <Building2 size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Company Intelligence</span>
                    </div>
                    {isDemo && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-[9px] font-bold uppercase tracking-tighter">
                            <Info size={10} />
                            Demo Mode
                        </div>
                    )}
                </div>
                <CardTitle className="text-2xl font-black text-slate-900 mt-2">{name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Landmark size={10} /> Industry
                        </p>
                        <p className="text-sm font-extrabold text-slate-700">{industry}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Users2 size={10} /> Estimated Size
                        </p>
                        <p className="text-sm font-extrabold text-slate-700">{sizeCategory}</p>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <div className="flex items-center gap-2 mb-2 text-primary">
                        <Target size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">Typical Hiring Focus</span>
                    </div>
                    <p className="text-sm font-bold text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                        {hiringFocus}
                    </p>
                </div>

                <p className="text-[9px] text-slate-400 font-medium italic">
                    * Company intel generated heuristically based on name and keywords.
                </p>
            </CardContent>
        </Card>
    );
}
