import React from "react";
import { useLocation } from "react-router-dom";

function FirstPage() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <header className="FirstPage">
      <h1>ברוכה הבאה, {user?.name}!</h1>
      <p>זה העמוד הראשון שלך</p>
    </header>
  );
}

export default FirstPage;
