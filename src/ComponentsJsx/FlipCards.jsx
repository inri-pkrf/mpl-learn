import React, { useState } from "react";
import "../ComponentsCss/FlipCard.css";

const FlipCard = ({ title, children }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-card" onClick={() => setFlipped(!flipped)}>
      <div className={`flip-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-front">
          <h2>{title}</h2>
          <p>לחצי כדי לפתוח</p>
        </div>

        <div className="flip-back">
          <div className="flip-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
