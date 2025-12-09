import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import CloudButtonsPage from './PartOne/CloudButtonsPage';
import CloudPage from './PartOne/CloudPage';
import FirstPage from './ComponentsJsx/FirstPage.jsx';
import Enternce from './ComponentsJsx/Enternce';
import Login from './ComponentsJsx/Login.jsx';
import Register from './ComponentsJsx/Register.jsx';
import Header from './ComponentsJsx/Header.jsx';
function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path="/" element={<Enternce />} />
        <Route path="/firstPage" element={<FirstPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
