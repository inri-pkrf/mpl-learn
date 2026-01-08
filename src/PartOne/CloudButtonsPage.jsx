import React, { useState, useEffect } from 'react';
import buttonsData from '../Data/CloudButtonsData';
import './Styles/CloudButtonsPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../FireBase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const CloudButtonsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [completed, setCompleted] = useState({});

  // טען את ההתקדמות מה-Firestore
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      const ref = doc(db, 'users', user.uid, 'progress', 'learnReact');
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCompleted(data.completed || {}); // data.completed זה אובייקט {id: true}
      } else {
        setCompleted({});
      }
    };
    fetchProgress();
  }, [user]);

  if (!user) return <div>אנא התחבר/י כדי לראות את העמוד</div>;

  // לחיצה על ענן
  const handleCloudClick = async (id) => {
    const newCompleted = { ...completed, [id]: true };
    setCompleted(newCompleted);

    // שמור ב-Firestore
    const ref = doc(db, 'users', user.uid, 'progress', 'learnReact');
    await setDoc(ref, { completed: newCompleted }, { merge: true });

    navigate(`/page/${id}`, { state: { user, startStep: id } });
  };

  // בדיקה אם כל העננים סומנו
  const allCompleted = buttonsData.every(btn => completed[btn.id]);

  const handleNavigate = () => {
    navigate("/map", { state: { user } });
  };

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
