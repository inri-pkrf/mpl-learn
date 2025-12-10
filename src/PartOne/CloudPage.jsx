import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import cloudData from '../Data/CloudData';
import { db } from '../FireBase';
import { doc, setDoc } from 'firebase/firestore';
import './Styles/CloudPage.css';

const CloudPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const pageData = cloudData.find(item => item.id === parseInt(id));
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!pageData) return <p>לא נמצא תוכן</p>;
  if (!user) {
    navigate('/login'); // אם אין user, מחזיר למסך התחברות
    return null;
  }

  const pages = pageData.pages;
  const page = pages[currentIndex];

  const handleNext = async () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1); // עובר לעמוד הבא בתוך אותו ענן
    } else {
      // שמירת התקדמות ב-Firebase
      const ref = doc(db, 'users', user.uid, 'progress', 'completedClouds');
      await setDoc(ref, { [id]: true }, { merge: true });

      // חוזר לעמוד הכפתורים או למפה ומעביר את user
      navigate('/cloudsPage', { state: { user } });
    }
  };

  return (
    <div className="cloud-page">
      <div className="cloud-page-item">
        <h1>{page.title}</h1>
        <div className="cloud-img-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/Assets/PartOne/${page.image}`}
            alt={page.title}
            className="cloud-page-img"
          />
          {/* אם יש imageInfo, מציגים את התמונה הנוספת */}
          {page.imageInfo && (
            <img
              src={`${process.env.PUBLIC_URL}/Assets/${page.imageInfo}`}
              alt="Info"
              className="cloud-page-img-info"
            />
          )}
          <div className="cloud-text">
            {page.subtitle && <h3>{page.subtitle}</h3>}
            <p>{page.text}</p>
          </div>
        </div>
      </div>
      <button className="next-button-cloud" onClick={handleNext}>
        <img src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`} alt="המשך" />
      </button>
    </div>
  );
};

export default CloudPage;
