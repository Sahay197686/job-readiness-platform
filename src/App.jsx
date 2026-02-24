import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardPage from './pages/DashboardPage';

// Placeholder Pages
const Placeholder = ({ name }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
    <h1 className="text-2xl font-bold mb-4">{name}</h1>
    <p className="text-slate-600">This is the {name} page placeholder.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<Placeholder name="Practice" />} />
          <Route path="/assessments" element={<Placeholder name="Assessments" />} />
          <Route path="/resources" element={<Placeholder name="Resources" />} />
          <Route path="/profile" element={<Placeholder name="Profile" />} />
        </Route>
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
