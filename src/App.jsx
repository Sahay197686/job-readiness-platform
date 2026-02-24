import React from 'react';
import './index.css';
import Layout from './components/Layout';
import Button from './components/Button';
import Card from './components/Card';
import Input from './components/Input';

function App() {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <section>
          <h2 style={{ marginBottom: 'var(--space-2)' }}>Core Components</h2>
          <p style={{ color: 'rgba(0,0,0,0.6)', marginBottom: 'var(--space-3)' }}>
            The KodNest Premium Build System uses a refined palette and intentional spacing to ensure clarity and confidence.
          </p>
        </section>

        <Card>
          <h3 style={{ marginBottom: 'var(--space-2)' }}>Registration Details</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '400px' }}>
            <Input label="Project Name" placeholder="e.g. Phoenix Engine" />
            <Input label="Architect Email" placeholder="architect@kodnest.com" type="email" />
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
              <Button>Save Configuration</Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </div>
        </Card>

        <Card padding="var(--space-4)">
          <h3 style={{ marginBottom: 'var(--space-2)' }}>System Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-success)' }}></div>
            <span style={{ fontWeight: 500 }}>All systems operational</span>
          </div>
          <p style={{ marginTop: 'var(--space-2)', fontSize: '15px' }}>
            The build system has been successfully initialized. All design tokens and components are ready for deployment.
          </p>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
