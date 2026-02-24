import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="layout-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Top Bar */}
            <header style={{
                height: '64px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 var(--space-3)',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                    KODNEST PREMIUM
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span style={{ fontSize: '14px', color: 'rgba(0,0,0,0.5)' }}>Step 1 / 4</span>
                    <div style={{
                        height: '4px',
                        width: '120px',
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{ height: '100%', width: '25%', backgroundColor: 'var(--color-accent)' }}></div>
                    </div>
                </div>
                <div style={{
                    padding: '4px 12px',
                    border: '1px solid var(--color-text)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600
                }}>
                    In Progress
                </div>
            </header>

            {/* Context Header */}
            <section style={{
                padding: 'var(--space-5) var(--space-3) var(--space-4)',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--space-1)' }}>System Initialization</h1>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.6)', fontStyle: 'italic' }}>
                        Defining the core architecture and design tokens for the premium build ecosystem.
                    </p>
                </div>
            </section>

            {/* Primary Workspace + Secondary Panel */}
            <main style={{ flex: 1, display: 'flex' }}>
                <div className="container" style={{ display: 'flex', width: '100%', flex: 1 }}>
                    {/* Primary Workspace (70%) */}
                    <div style={{ width: '70%', borderRight: '1px solid var(--color-border)', padding: 'var(--space-4) var(--space-3)' }}>
                        {children}
                    </div>

                    {/* Secondary Panel (30%) */}
                    <aside style={{ width: '30%', padding: 'var(--space-4) var(--space-3)', backgroundColor: '#FAF9F6' }}>
                        <h3 style={{ marginBottom: 'var(--space-2)', fontSize: '1.5rem' }}>Next Steps</h3>
                        <p style={{ marginBottom: 'var(--space-3)', fontSize: '15px' }}>
                            The current phase involves setting up the base layout. Ensure all components align with the "Calm, Intentional" philosophy.
                        </p>
                        <div style={{
                            padding: 'var(--space-2)',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--color-border)',
                            marginBottom: 'var(--space-3)'
                        }}>
                            <code style={{ fontSize: '13px', color: 'var(--color-accent)' }}>npm run build:premium</code>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            <button style={{
                                backgroundColor: 'var(--color-accent)',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: 'var(--space-2)',
                                fontWeight: 600
                            }}>Build in Lovable</button>
                            <button style={{
                                backgroundColor: 'transparent',
                                border: '1px solid var(--color-text)',
                                padding: 'var(--space-2)',
                                fontWeight: 600
                            }}>It Worked</button>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Proof Footer */}
            <footer style={{
                borderTop: '1px solid var(--color-text)',
                backgroundColor: '#FFFFFF',
                padding: 'var(--space-2) var(--space-3)',
                position: 'sticky',
                bottom: 0,
                zIndex: 10
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '14px', fontWeight: 500 }}>
                            <input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} /> UI Built
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '14px', fontWeight: 500 }}>
                            <input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} /> Logic Working
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '14px', fontWeight: 500 }}>
                            <input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} /> Test Passed
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '14px', fontWeight: 500 }}>
                            <input type="checkbox" style={{ accentColor: 'var(--color-accent)' }} /> Deployed
                        </label>
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.5 }}>
                        KodNest Premium Build System © 2026
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
