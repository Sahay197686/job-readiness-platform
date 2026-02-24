import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <header className="bg-white px-6 py-20 lg:py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 transition-all duration-300">
                    Ace Your <span className="underline decoration-primary decoration-4 underline-offset-8">Placement</span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all duration-200"
                >
                    Get Started
                </button>
            </header>

            {/* Features Grid */}
            <section className="bg-slate-50 py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-2"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Practice Problems</h3>
                        <p className="text-slate-600">Solve curated coding challenges and technical questions.</p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Mock Interviews</h3>
                        <p className="text-slate-600">Realistic interview simulations with real-time feedback.</p>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                        <p className="text-slate-600">Visualize your growth and identify areas for improvement.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Placement Prep. All rights reserved.</p>
            </footer>
        </div>
    );
}
