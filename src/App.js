import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AnalyzePage from './pages/AnalyzePage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <span className="logo">🌲</span>
            <span className="brand-name">Forest Value Canvas</span>
          </div>
          
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/analyze" className="nav-link">Analyze</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/login" className="nav-link login-btn">Login</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>🌳 Forest Ecosystem Services Visualizer | For Small-Scale Forest Owners in Germany & Switzerland</p>
          <p>© 2025 | Supporting Sustainable Forestry Practices</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;