import React, { useState, useEffect } from 'react';
import buttonsData from '../Data/CloudButtonsData';
import './Styles/CloudButtonsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../FireBase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CloudButtonsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user; // נשלח דרך ניווט

  const [completed, setCompleted] = useState({});

  useEffect(() => {
    if (!user) return;

    // טוען את ההתקדמות הקודמת מה-Firebase
    async function fetchCompleted() {
      const ref = doc(db, 'users', user.uid, 'progress', 'completedClouds');
      const snap = await getDoc(ref);
      if (snap.exists()) setCompleted(snap.data());
    }
    fetchCompleted();
  }, [user]);

  if (!user) return <div>אנא התחבר/י כדי לראות את העמוד</div>;

  const handleCloudClick = (id) => {
    navigate(`/page/${id}`, { state: { user } });
  };

  const handleNavigate = async () => {
    // מעבר חזרה למפה
    navigate("/map", { state: { user } });
  };

  // בודק אם כל העננים סומנו כהושלמו
  const allCompleted = buttonsData.every(btn => completed[btn.id]);

  return (
    <div className="CloudButtonsPage">
      <h1 className="login-title">איך נראה היום יום?</h1>

      <div className="buttons-container">
        {buttonsData.map((btn) => (
          <button
            key={btn.id}
            className={`cloud-button ${completed[btn.id] ? 'completed' : ''}`}
            onClick={() => handleCloudClick(btn.id)}
          >
            <div className="cloud-image-wrapper">
              <img
                src={`${process.env.PUBLIC_URL}/${btn.image}`}
                alt={btn.title}
                className="cloud-image"
              />
              <span className="cloud-text">
                {btn.title} {completed[btn.id] && <span className="checkmark">✔️</span>}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* כפתור מעבר למפה יוצג רק אם כל העננים סומנו */}
      {allCompleted && (
        <button
          className="next-button-cloudPage"
          onClick={handleNavigate}
          style={{ cursor: "pointer", marginTop: "20px" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`}
            alt="המשך למפה"
          />
        </button>
      )}
    </div>
  );
};

export default CloudButtonsPage;
