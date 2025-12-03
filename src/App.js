import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CloudButtonsPage from './Components.jsx/CloudButtonsPage';
import CloudPage from './Components.jsx/CloudPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CloudButtonsPage />} />
        <Route path="/page/:id" element={<CloudPage />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
