import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { CheckCircle2, Rocket, Lock, ArrowLeft } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

export default function ShippingPage() {
    const saved = localStorage.getItem('prp_test_checklist');
    const checklist = saved ? JSON.parse(saved) : {};
    const passedCount = Object.values(checklist).filter(v => v).length;

    // Strict Lock
    if (passedCount < 10) {
        return <Navigate to="/prp/07-test" replace />;
    }

    return (
        <div className="max-w-2xl mx-auto py-12 text-center space-y-8">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
                <Rocket size={48} />
            </div>

            <div className="space-y-3">
                <h1 className="text-4xl font-black text-slate-900">Ready to Ship</h1>
                <p className="text-slate-500 font-medium">All 10 quality checks passed. The platform is hardened and stable.</p>
            </div>

            <Card className="bg-emerald-50 border-emerald-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle2 size={100} />
                </div>
                <CardContent className="p-8 relative z-10">
                    <div className="flex items-center gap-3 justify-center mb-6 text-emerald-600">
                        <CheckCircle2 size={24} />
                        <span className="font-black text-xs uppercase tracking-widest">Quality Assurance Verified</span>
                    </div>
                    <p className="text-emerald-900 font-bold mb-8 italic">
                        "Your code is now compliant with the strict data model and score stability rules."
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-block bg-primary text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95"
                    >
                        Return to Dashboard
                    </Link>
                </CardContent>
            </Card>

            <Link to="/prp/07-test" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm">
                <ArrowLeft size={16} />
                Back to Checklist
            </Link>
        </div>
    );
}
