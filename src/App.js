import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { auth, db } from './FireBase';
import { doc, getDoc } from 'firebase/firestore';
import "./App.css";

import CloudButtonsPage from './PartOne/CloudButtonsPage';
import CloudPage from './PartOne/CloudPage';
import FirstPage from './ComponentsJsx/FirstPage.jsx';
import Enternce from './ComponentsJsx/Enternce';
import Login from './ComponentsJsx/Login.jsx';
import Register from './ComponentsJsx/Register.jsx';
import Header from './ComponentsJsx/Header.jsx';
import Map from './ComponentsJsx/Map.jsx';
import CollageLang from './PartTwo/CollageLang.jsx';
import LearnReact from './PartThree/LearnReact.jsx';
function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setUser({ uid: currentUser.uid, ...docSnap.data() });
      }
    };
    fetchUser();
  }, []);

  // Header יוצג רק אם הנתיב **אינו** /map
  const showHeader = location.pathname !== "/map";

  return (
    <div className="App">
      {showHeader && <Header user={user} />}

      <Routes>
        <Route path="/" element={<Enternce />} />
        <Route path="/firstPage" element={<FirstPage user={user} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cloudsPage" element={<CloudButtonsPage user={user} />} />
        <Route path="/page/:id" element={<CloudPage user={user} />} />
        <Route path="/map" element={<Map user={user} />} />
        <Route path="/collageLanguge" element={<CollageLang user={user} />} />
        <Route path="/LearnReact" element={<LearnReact user={user} />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default AppWrapper;
