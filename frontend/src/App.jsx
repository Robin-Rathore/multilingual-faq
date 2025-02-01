import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FAQDashboard from './pages/FAQDashboard';
import FAQCreate from './pages/FAQCreate';
import AdminDashboard from './pages/AdminDashboard';
import LanguageSelector from './pages/LanguageSelector';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<FAQDashboard />} />
            <Route path="/create" element={<FAQCreate />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/languages" element={<LanguageSelector />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;