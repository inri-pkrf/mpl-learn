import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsCss/Enternce.css";

const Enternce = () => {
  const navigate = useNavigate();

  const handleClick = (answer) => {
    if (answer === "yes") {
      navigate("/register"); // ניווט לעמוד הרשמה
    } else {
      navigate("/login"); // ניווט לעמוד כניסה
    }
  };

  return (
    <div className="Enternce-container">
      <h1 className="Enternce-title">איזה כיף שאת איתנו !!!</h1>
      <img
        src={`${process.env.PUBLIC_URL}/Assets/People/Avital.png`}
        className="Avital-Entrence"
      />
      <p className="greetings">פעם ראשונה שלך איתנו ?</p>
      <div className="buttons-answer">
        <div className="btn-answer" onClick={() => handleClick("yes")}>
          <p>כן</p>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/cloudButtonYes.png`}
            className="cloudEt-btn"
          />
        </div>
        <div className="btn-answer" onClick={() => handleClick("no")}>
          <p>לא</p>
          <img
            src={`${process.env.PUBLIC_URL}/Assets/cloudButtonNo.png`}
            className="cloudEt-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default Enternce;
