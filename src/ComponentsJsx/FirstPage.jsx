import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../ComponentsCss/FirstPage.css";

function FirstPage() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();

  const [score, setScore] = useState(""); // מצב לשדה הקלט

  const handleInputChange = (e) => {
    const value = e.target.value;
    // מקבלים רק מספרים חיוביים
    if (/^\d*$/.test(value)) {
      setScore(value);
    }
  };

  const handleNavigate = () => {
    if (Number(score) >= 70) {
      navigate("/map", { state: { user} });
    }
  };

  const numericScore = Number(score);
  const canContinue = numericScore >= 70;
  const showWarning = numericScore > 0 && numericScore < 70;

  return (
    <div className="FirstPage">
      <h1 className="FirstPage-title">
        {user?.name} ברוכה הבאה למכללה לאיתנות ישראלית!!!
      </h1>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/People/AvitalSIT.png`}
        className="Avital-sit"
      />
      <div className="speach-buble">
        <img
          src={`${process.env.PUBLIC_URL}/Assets/speachBuble.png`}
          className="speach-bubleimg"
        />
        <p className="buble-text">
          רגע לפני שנתחיל את החפיפה שלכן ...
          כנסו ל
          <a
            className="link-buble"
            href="https://inri-pkrf.github.io/know-college/"
            target="_blank"
            rel="noopener noreferrer"
          >
            לומדת ת”ז מכללה
          </a>
          . הזינו את הציון שלכן כאן (כדאי שיהיה מעל 70)
        </p>

        <input
          type="text"
          value={score}
          onChange={handleInputChange}
          placeholder="הזינו את הציון שלכם (מספר בלבד)"
          className="score-input"
        />

        {/* הודעת אזהרה אם הציון מתחת ל-70 */}
        {showWarning && (
          <p className="alert">
            הציון חייב להיות מעל 70 כדי להמשיך!
          </p>
        )}

        {/* כפתור תמיד פעיל */}
        <button
          className={`next-button ${canContinue ? "active" : "disabled"}`}
          onClick={canContinue ? handleNavigate : undefined}
          disabled={!canContinue}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`}
            alt="המשך למפה"
          />
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
