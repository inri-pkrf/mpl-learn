import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/Downloads.css";

function Downloads() {
  const location = useLocation();

  const navigate = useNavigate();

  const handleNavigate = () => {
  navigate('/map', { state: { user } });
};
  const user = location.state?.user;
  return (
    <div className="Downloads">
    <h1 className="Downloads-title">
  היי {user?.full_name}❤️
</h1>
    <h1 className="Downloads-title2">
       נו כמעט סיימת חפיפה, מתרגשת???
</h1>

 <div className="speach-buble">
        <img
          src={`${process.env.PUBLIC_URL}/Assets/speachBuble.png`}
          className="speach-bubleimg-do"
        />
        <p className="buble-text-do">
                 בחלק הזה תקראי למפתחת לומדה ותיקה את לא עושה לבד
            <p></p>
           <a
            className="link-buble-do"
            href="https://docs.google.com/document/d/1R6mBVnwoowEE16KW9naZEooIAar_fp2A3VsqtUwSmpg/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            כנסי לקישור
          </a>
        </p>
        </div>

      <img
        src={`${process.env.PUBLIC_URL}/Assets/People/Eliora.png`}
        className="Eliora-download"
      />

    
        <button
          className="next-button-download"
          onClick={handleNavigate}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Assets/Arrow.png`}
            alt="המשך למפה"
          />
        </button>
    </div>
  );
}

export default Downloads;
